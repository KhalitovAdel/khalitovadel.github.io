import { Module } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces/scope-options.interface';
import puppeteer, { Browser } from 'puppeteer';

import { CustomProvider } from '../enum/custom-provider.enum';

@Module({
    providers: [
        {
            provide: CustomProvider.PUPPETEER_INSTANCE,
            useFactory: async () => {
                return await puppeteer.launch({
                    ignoreHTTPSErrors: false,
                    headless: false,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                });
            },
        },
        {
            provide: CustomProvider.PUPPETEER_PAGE,
            scope: Scope.TRANSIENT,
            useFactory: async (service: Browser) => {
                return () => service.newPage();
            },
            inject: [CustomProvider.PUPPETEER_INSTANCE],
        },
    ],
    exports: [CustomProvider.PUPPETEER_PAGE],
})
export class BrowserModule {}
