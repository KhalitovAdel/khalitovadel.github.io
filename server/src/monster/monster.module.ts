import { HttpModule, HttpService } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Inject, Module } from '@nestjs/common';

import { CookieStorage } from '../common/cookie.storage';
import { BullQueueEnum } from '../enum/bull-queue.enum';
import { CustomProvider } from '../enum/custom-provider.enum';
import { MonsterApi } from './navigator/monster.api';
import { MonsterConsumer } from './navigator/monster.consumer';
import { MonsterLogin } from './navigator/monster.login';
import { MonsterWatcher } from './navigator/monster.watcher';

// TODO: Move all http requests function to utils, and rename utils => api
@Module({
    imports: [
        BullModule.registerQueue({
            name: BullQueueEnum.MONSTER,
        }),
        HttpModule.register({ validateStatus: (status: number) => status >= 200 && status <= 302 }),
    ],
    providers: [
        MonsterApi,
        MonsterLogin,
        // MonsterMonitorService,
        {
            provide: CustomProvider.MONSTER_IDENTITY__COOKIE_STORAGE,
            useValue: new CookieStorage(),
        },
        MonsterConsumer,
        // MonsterUpdater,
        MonsterWatcher,
    ],
})
export class MonsterModule {
    constructor(
        protected readonly http: HttpService,
        @Inject(CustomProvider.MONSTER_IDENTITY__COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage,
        protected readonly loginService: MonsterLogin
    ) {
        this.http.axiosRef.defaults.withCredentials = true;
        this.http.axiosRef.defaults.headers.common['User-Agent'] =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';

        this.http.axiosRef.interceptors.response.use((value) => {
            if (Array.isArray(value.headers['set-cookie'])) {
                this.cookieStorage.setCookieFromStringArray(value.headers['set-cookie']);
            }

            return value;
        });

        this.http.axiosRef.interceptors.request.use((value) => {
            if (this.loginService.isLogin()) {
                value.headers.Authorization = `Bearer ${this.loginService.token}`;
            }

            value.headers.Cookie = this.cookieStorage.getCookieString();

            return value;
        });
    }
}
