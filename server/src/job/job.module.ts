import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { DatabaseModule } from '../database/database.module';
import { CustomProvider } from '../enum/custom-provider.enum';
import { JobDatabase } from './job.database';
import { JobEntity } from './job.entity';
import { JobService } from './job.service';

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([JobEntity])],
    providers: [
        {
            provide: CustomProvider.JOB_MANAGER,
            useFactory: (connection: Connection) => connection.getRepository<JobEntity>(JobEntity).manager,
            inject: [Connection],
        },
        JobDatabase,
        JobService,
    ],
    exports: [JobService],
})
export class JobModule {}
