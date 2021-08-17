import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { CookieStorage } from '../../common/cookie.storage';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { IMonsterState } from '../interface/monster-state.interface';
import { MonsterApi } from './monster.api';

@Injectable()
export class MonsterLogin {
    protected state!: IMonsterState | null;

    constructor(
        @Inject(HttpService) protected readonly http: HttpService,
        @Inject(CustomProvider.MONSTER_IDENTITY__COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage,
        protected readonly api: MonsterApi
    ) {}

    get token(): string | null {
        return this.state?.state?.auth?.token || null;
    }

    public isLogin(): boolean {
        return !!this.token && !!this.state;
    }

    public async logout(): Promise<void> {
        this.cookieStorage.clear();
        this.state = null;
    }

    public async login(): Promise<void> {
        const { state } = await this.api.login();
        this.state = state;
    }
}
