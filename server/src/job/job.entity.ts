import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { DatabaseIndex } from '../database/enum/database-index.enum';
import { ErrorCode } from '../enum/error-code.enum';
import { JobStatus } from './enum/job-status.enum';
import { JobType } from './enum/job-type.enum';

@Entity()
@Unique(DatabaseIndex.JOB_FIND_BY_TYPE_AND_JOB, ['type', 'jobId'])
export class JobEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        type: 'enum',
        enum: JobType,
        nullable: false,
    })
    type!: JobType;

    @Column({ nullable: false })
    jobId!: string;

    @Column({
        type: 'enum',
        enum: JobStatus,
        default: JobStatus.NEED_TO_HANDLE,
        nullable: false,
    })
    status!: JobStatus;

    @Column({
        type: 'enum',
        enum: ErrorCode,
        nullable: true,
    })
    code!: ErrorCode;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
