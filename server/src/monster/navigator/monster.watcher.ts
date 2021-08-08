import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Page } from 'puppeteer';

import { CustomProvider } from '../../enum/custom-provider.enum';

//Working by cron check isLogin every time
@Injectable()
export class MonsterWatcher implements OnModuleInit {
    constructor(@Inject(CustomProvider.MONSTER_PAGE) protected readonly page: Page) {}

    async onModuleInit(): Promise<void> {
        await this.init();
    }

    async init(): Promise<void> {
        await Promise.resolve();
    }
}
