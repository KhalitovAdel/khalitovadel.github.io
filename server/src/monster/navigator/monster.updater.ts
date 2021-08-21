import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

import { ErrorDefault } from '../../error';
import { IMonsterTask } from '../interface/monster-task.interface';
import { MonsterLogin } from './monster.login';

//Get token from monster login, subscribe isLogin true, when he recieve isLogin start update onModuleInit
@Injectable()
export class MonsterUpdater {
    constructor(protected readonly service: MonsterLogin) {}

    protected async update(job: Job<IMonsterTask>, error: ErrorDefault | unknown): Promise<void> {
        const isError = error instanceof ErrorDefault;
        console.log(job.data, isError ? error : undefined, !isError ? error : undefined);
    }

    public handleResult = this.update.bind(this);

    public handleError = this.update.bind(this);
}
