import { JobEntity } from '../job.entity';

export type IJobCreate = Pick<JobEntity, 'type' | 'jobId'>;

export type IJobUpdatePayload = Pick<JobEntity, 'status'> & Partial<Pick<JobEntity, 'code'>>;

export type IJobUpdate = IJobCreate & IJobUpdatePayload;
