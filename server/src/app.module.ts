import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import cfg from './cfg';
import { MonsterModule } from './monster/monster.module';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: cfg.redis.host,
                port: cfg.redis.port,
                db: cfg.bull.db,
            },
        }),
        MonsterModule,
    ],
})
export class AppModule {}
