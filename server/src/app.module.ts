import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import cfg from './cfg';
import { DatabaseModule } from './database/database.module';
import { JobModule } from './job/job.module';
import { MonsterModule } from './monster/monster.module';

@Module({
    imports: [
        DatabaseModule,
        JobModule,
        BullModule.forRoot({
            redis: {
                host: cfg.redis.host,
                port: cfg.redis.port,
                db: cfg.bull.db,
            },
        }),
        MonsterModule,
        ScheduleModule.forRoot(),
    ],
})
export class AppModule {}
