//https://docs.nestjs.com/techniques/queues
//if !isLogin pause schedule. if isLogin play
import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { BullQueueEnum } from '../../enum/bull-queue.enum';
import { ErrorDefault } from '../../error';
import { IMonsterTask } from '../interface/monster-task.interface';
import { MonsterApi } from './monster.api';
import { MonsterUpdater } from './monster.updater';

@Processor(BullQueueEnum.MONSTER)
export class MonsterConsumer {
    constructor(protected readonly api: MonsterApi, protected readonly updater: MonsterUpdater) {}

    @Process()
    public async processJob(job: Job<IMonsterTask>): Promise<unknown> {
        return await this.api.handleJob(job.data.jobId);
    }

    @OnQueueFailed()
    public async handleFail(job: Job<IMonsterTask>, error: ErrorDefault): Promise<void> {
        await this.updater.handleError(job, error);
    }

    @OnQueueCompleted()
    public async handleSuccess(job: Job<IMonsterTask>, result: unknown): Promise<void> {
        await this.updater.handleResult(job, result);
    }
}
