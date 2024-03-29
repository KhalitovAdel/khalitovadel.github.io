import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';

import cfg from '../../cfg';
import { BullQueueEnum } from '../../enum/bull-queue.enum';
import { ErrorDefault } from '../../error';
import { JobStatus } from '../../job/enum/job-status.enum';
import { JobType } from '../../job/enum/job-type.enum';
import { JobService } from '../../job/job.service';
import { IListArg } from '../interface/monster.watcher.interface';
import { IMonsterJob, IMonsterJonResponse } from '../interface/monster-jobs.interface';
import { IMonsterTask } from '../interface/monster-task.interface';
import { MonsterApi } from './monster.api';
import { MonsterLogin } from './monster.login';

@Injectable()
export class MonsterWatcher implements OnModuleInit {
    protected readonly logger = new Logger(MonsterWatcher.name);
    protected fingerPrint!: string | null;

    protected interval: NodeJS.Timer | undefined;

    constructor(
        @Inject(MonsterApi) protected readonly api: MonsterApi,
        protected readonly jobService: JobService,
        @InjectQueue(BullQueueEnum.MONSTER) private queue: Queue,
        @Inject(MonsterLogin) protected readonly loginService: MonsterLogin
    ) {}

    async onModuleInit(): Promise<void> {
        this.loginService.$isLogin.subscribe((val) => {
            if (!val && this.interval) return clearInterval(this.interval);
            if (val && !this.interval) {
                this.cronJob();
                this.interval = setInterval(() => this.cronJob(), cfg.monster.interval.watch);
            }
        });
    }

    protected async cronJob(): Promise<void> {
        if (!this.loginService.isLogin) return;
        try {
            await Promise.all(cfg.monster.jobQuery.addresses.map((address) => cfg.monster.jobQuery.positions.map((position) => this.unitHandlerOfTask(address, position))));
        } catch (e) {
            this.logger.error(e.message);
        }
    }

    protected async unitHandlerOfTask(address: string, query: string): Promise<void> {
        // TODO: abstract this list
        const excludeIds: IListArg['filter']['excludeIds'] = await this.jobService
            .list({ where: { type: JobType.MONSTER }, select: ['jobId'] })
            .then(({ data }) => data.map((el) => el.jobId));

        let hasResult = true;
        const limit = 10;
        let skip = 0;

        while (hasResult) {
            const { jobResults } = await this.api.listJob({ filter: { excludeIds, address, query }, limit, skip });

            hasResult = !!jobResults.length;
            skip += limit;

            //Error from here doesn't mater
            this.handleJobs(jobResults || []).catch((e) => e);
        }
    }

    protected async handleJobs(jobs: IMonsterJonResponse['jobResults']): Promise<void> {
        await Promise.all(jobs.filter((job) => job.apply.applyType === 'INTEGRATED').map((job) => this.handleJob(job)));
    }

    protected async handleJob(job: IMonsterJob): Promise<void> {
        const where = { type: JobType.MONSTER, jobId: job.jobId };
        const exists = await this.jobService.fetch({ where });
        if (exists) return;

        await this.jobService.create(where);
        try {
            const task: IMonsterTask = { jobId: job.jobId };
            await this.queue.add(task);
        } catch (e) {
            const error = e instanceof ErrorDefault ? e : new ErrorDefault();
            await this.jobService.update({ type: JobType.MONSTER, jobId: job.jobId, code: error.code, status: JobStatus.ERROR });
        }
    }
}
