import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import cfg from '../../cfg';
import { IListArg } from '../interface/monster.watcher.interface';
import { IMonsterJob, IMonsterJonResponse } from '../interface/monster-jobs.interface';
import { MonsterApi } from './monster.api';

@Injectable()
export class MonsterWatcher implements OnModuleInit {
    protected fingerPrint!: string | null;

    constructor(@Inject(MonsterApi) protected readonly api: MonsterApi) {}

    async onModuleInit(): Promise<void> {
        await this.init();
    }

    get isInit(): boolean {
        return !!this.fingerPrint;
    }

    async init(): Promise<void> {
        await Promise.resolve();
    }

    // TODO: decorate that method as cron
    // TODO: check monitor, if (!isLogin) return;
    protected async cronJob(): Promise<void> {
        await Promise.all(cfg.monster.jobQuery.addresses.map((address) => cfg.monster.jobQuery.positions.map((position) => this.unitHandlerOfTask(address, position))));
    }

    protected async unitHandlerOfTask(address: string, query: string): Promise<void> {
        // TODO: Find all existing positions
        const excludeIds: IListArg['filter']['excludeIds'] = [];
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

    // TODO: need tests for pagination, does sort of jobResult is strict
    protected async handleJob(_job: IMonsterJob): Promise<void> {
        // TODO: save job to database before sending to queue
        // TODO: send to queue
    }
}
