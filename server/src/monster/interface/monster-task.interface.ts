import { IMonsterJob } from './monster-jobs.interface';

export type IMonsterTask = Pick<IMonsterJob, 'jobId'>;
