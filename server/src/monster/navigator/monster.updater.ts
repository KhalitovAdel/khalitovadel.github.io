import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

import { ErrorDefault } from '../../error';
import { JobService } from '../../job/job.service';
import { IMonsterTask } from '../interface/monster-task.interface';
import { MonsterAdapter } from './monster.adapter';

@Injectable()
export class MonsterUpdater {
    // TODO: DI
    constructor(protected readonly service: JobService) {}

    protected async update(job: Job<IMonsterTask>, error?: ErrorDefault): Promise<void> {
        const isError = error instanceof ErrorDefault;
        await this.service.update(new MonsterAdapter(job.data, isError ? error : undefined));
    }

    public handleResult = this.update.bind(this);

    public handleError = this.update.bind(this);
}
