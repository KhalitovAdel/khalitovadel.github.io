import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BehaviorSubject } from 'rxjs';

import { CookieStorage } from '../../common/cookie.storage';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { IMonsterState } from '../interface/monster-state.interface';
import { MonsterApi } from './monster.api';

@Injectable()
export class MonsterLogin implements OnModuleInit {
    protected readonly logger = new Logger(MonsterLogin.name);
    protected state!: IMonsterState | null;

    protected interval: NodeJS.Timer | undefined;

    protected readonly _isLogin = new BehaviorSubject(false);
    public readonly $isLogin = this._isLogin.asObservable();

    constructor(
        @Inject(HttpService) protected readonly http: HttpService,
        @Inject(CustomProvider.MONSTER_IDENTITY_COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage,
        protected readonly api: MonsterApi
    ) {}

    async onModuleInit(): Promise<void> {
        if (!this.isLogin) {
            await this.login();
        }
    }

    @Cron('0 */1 * * * *')
    protected async cronLogin(): Promise<void> {
        if (this.isLogin) return;
        await this.login();
    }

    get token(): string | null {
        return this.state?.state?.auth?.token || null;
    }

    get isLogin(): boolean {
        return !!this.state;
    }

    public async logout(): Promise<void> {
        this._isLogin.next(false);
        this.cookieStorage.clear();
        this.state = null;
    }

    public async login(): Promise<void> {
        try {
            const { state } = await this.api.login();
            this.state = state;
            if (this.isLogin) this._isLogin.next(true);
        } catch (e) {
            this.logger.error('Error with login: ' + e.message);
        }
    }

    async hasProblemWithCred(): Promise<void> {
        await this.logout();
    }
}
