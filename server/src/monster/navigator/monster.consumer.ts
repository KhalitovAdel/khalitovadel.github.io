import { InjectQueue, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Job, Queue } from 'bull';

import { BullQueueEnum } from '../../enum/bull-queue.enum';
import { ErrorDefault } from '../../error';
import { IMonsterTask } from '../interface/monster-task.interface';
import { MonsterApi } from './monster.api';
import { MonsterLogin } from './monster.login';
import { MonsterUpdater } from './monster.updater';

@Processor(BullQueueEnum.MONSTER)
export class MonsterConsumer implements OnModuleInit {
    constructor(
        protected readonly api: MonsterApi,
        protected readonly updater: MonsterUpdater,
        @Inject(MonsterLogin) protected readonly loginService: MonsterLogin,
        @InjectQueue(BullQueueEnum.MONSTER) private queue: Queue
    ) {}

    onModuleInit(): void {
        this.loginService.$isLogin.subscribe(async (val) => {
            switch (val) {
                case true:
                    await this.queue.resume();
                    break;
                default:
                    await this.queue.pause();
                    break;
            }
        });
    }

    @Process()
    public async processJob(job: Job<IMonsterTask>): Promise<unknown> {
        return await this.api.handleJob(job.data.jobId);
    }

    @OnQueueFailed()
    public async handleFail(job: Job<IMonsterTask>, error: ErrorDefault): Promise<void> {
        await this.updater.handleError(job, error);
        await this.loginService.hasProblemWithCred();
    }

    @OnQueueCompleted()
    public async handleSuccess(job: Job<IMonsterTask>): Promise<void> {
        await this.updater.handleResult(job);
    }
}
