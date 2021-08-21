import { Inject, Injectable } from '@nestjs/common';

import { IJobCreate, IJobUpdate } from './interface/job.interface';
import { JobDatabase } from './job.database';
import { JobEntity } from './job.entity';

@Injectable()
export class JobService {
    constructor(@Inject(JobDatabase) protected readonly db: JobDatabase) {}

    public async create(toCreate: IJobCreate): Promise<JobEntity> {
        return this.db.create(toCreate);
    }

    public async update(toUpdate: IJobUpdate): Promise<JobEntity> {
        const { type, jobId, ...other } = toUpdate;

        return this.db.updateOne({ where: { type, jobId } }, other);
    }

    public list = this.db.list.bind(this.db);
}
