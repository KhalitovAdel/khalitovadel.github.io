import { ErrorCode } from '../../enum/error-code.enum';
import { ErrorDefault } from '../../error';
import { JobStatus } from '../../job/enum/job-status.enum';
import { JobType } from '../../job/enum/job-type.enum';
import { IJobUpdate } from '../../job/interface/job.interface';
import { IMonsterTask } from '../interface/monster-task.interface';

export class MonsterAdapter implements IJobUpdate {
    public jobId!: string;
    public status!: JobStatus;
    public type: JobType = JobType.MONSTER;
    public code!: ErrorCode | undefined;

    constructor(job: IMonsterTask, error?: ErrorDefault | undefined) {
        this.jobId = job.jobId;
        this.status = error instanceof ErrorDefault ? JobStatus.ERROR : JobStatus.JOINED;
        if (error) this.code = error.code;
    }
}
