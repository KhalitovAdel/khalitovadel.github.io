import { Module } from '@nestjs/common';

import { BrowserModule } from './browser/browser.module';
import { MonsterModule } from './monster/monster.module';

@Module({
    imports: [BrowserModule, MonsterModule],
})
export class AppModule {}
