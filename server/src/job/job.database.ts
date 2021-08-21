import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { DatabaseDefault } from '../database/database.default';
import { CustomProvider } from '../enum/custom-provider.enum';
import { IJobCreate, IJobUpdatePayload } from './interface/job.interface';
import { JobEntity } from './job.entity';

@Injectable()
export class JobDatabase extends DatabaseDefault<IJobCreate, IJobUpdatePayload, JobEntity> {
    constructor(@Inject(CustomProvider.JOB_MANAGER) protected readonly manager: EntityManager) {
        super(JobEntity, manager, 'id');
    }
}
