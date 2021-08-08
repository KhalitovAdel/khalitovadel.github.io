import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Page } from 'puppeteer';

import { BrowserModule } from '../browser/browser.module';
import { CustomProvider } from '../enum/custom-provider.enum';
import { MonsterMonitorService } from './monster-monitor.service';
import { MonsterLogin } from './navigator/monster.login';

@Module({
    imports: [BrowserModule, HttpModule],
    providers: [
        {
            provide: CustomProvider.MONSTER_PAGE,
            useFactory: async (pageGenerator: () => Promise<Page>) => {
                return pageGenerator();
            },
            inject: [CustomProvider.PUPPETEER_PAGE],
        },
        MonsterLogin,
        MonsterMonitorService,
        // MonsterUpdater,
        // MonsterWatcher,
    ],
})
export class MonsterModule {}
