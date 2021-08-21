import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import cfg from '../cfg';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: cfg.db.type as PostgresConnectionOptions['type'],
            host: cfg.db.host,
            port: cfg.db.port,
            username: cfg.db.username,
            password: cfg.db.password,
            database: cfg.db.database,
            synchronize: cfg.db.synchronize,
            autoLoadEntities: cfg.db.autoLoadEntities,
        }),
    ],
})
export class DatabaseModule {}
