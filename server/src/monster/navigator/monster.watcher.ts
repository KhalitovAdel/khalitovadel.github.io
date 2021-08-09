import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MonsterWatcher implements OnModuleInit {
    async onModuleInit(): Promise<void> {
        await this.init();
    }

    async init(): Promise<void> {
        await Promise.resolve();
    }
}
