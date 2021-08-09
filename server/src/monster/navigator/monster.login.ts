import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';
import { lastValueFrom } from 'rxjs';

import cfg from '../../cfg';
import { CookieStorage } from '../../common/cookie.storage';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { ErrorDefault } from '../../error';
import { IMonsterState } from '../interface/monster-state.interface';

@Injectable()
export class MonsterLogin {
    public state!: IMonsterState | null;

    public token!: string | null;

    constructor(public readonly http: HttpService, @Inject(CustomProvider.MONSTER_IDENTITY__COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage) {}

    public isLogin(): boolean {
        return !!this.token && !!this.state;
    }

    public async logout(): Promise<void> {
        this.cookieStorage.clear();
        this.state = null;
        this.token = null;
    }

    public async login(): Promise<void> {
        const { state, client: client_id } = await this.getInitDetails();

        const response = await lastValueFrom(
            this.http.request({
                method: 'POST',
                url: new URL(cfg.monster.routes.login, cfg.monster.hosts.identity).href,
                data: {
                    client_id,
                    tenant: 'monster-candidate-prod',
                    response_type: 'code',
                    state,
                    username: cfg.monster.auth.email,
                    password: cfg.monster.auth.password,
                    connection: 'Username-Password-Authentication',
                    scope: 'openid profile email offline_access',
                    audience: 'profiles-profile-app-service',
                    _csrf: this.cookieStorage.getByKey('_csrf'),
                },
            })
        );

        if (response.status !== HttpStatus.OK || typeof response.data !== 'string') throw new ErrorDefault();

        const form = new JSDOM(response.data);
        this.token = (form.window.document.querySelector('input[name="wresult"]') as HTMLInputElement).value;
        const localState = (form.window.document.querySelector('input[name="wctx"]') as HTMLInputElement).value;
        const wa = (form.window.document.querySelector('input[name="wa"]') as HTMLInputElement).value;

        const payload = new URLSearchParams();
        payload.append('wa', wa);
        payload.append('wresult', this.token);
        payload.append('wctx', localState);

        const urlCb = new URL(cfg.monster.routes.loginCb, cfg.monster.hosts.identity);
        const responseCb = await lastValueFrom(
            this.http.request({
                method: 'POST',
                url: urlCb.href,
                maxRedirects: 0,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: payload,
            })
        );

        if (responseCb.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const detailsPage = await this.redirectLoop(responseCb.headers.location, urlCb.origin);

        const profile = new JSDOM(detailsPage.data, { runScripts: 'dangerously' });
        this.state = profile.window.__INITIAL_DATA__;
    }

    // In last request, into html you can see how to encode state
    protected async getInitDetails(): Promise<{ state: string; client: string }> {
        const detailsUrl = new URL(cfg.monster.routes.profileDetails, cfg.monster.hosts.monster);
        const response = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: detailsUrl.href,
                maxRedirects: 0,
                withCredentials: true,
            })
        );

        if (response.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const responseAuth = await this.redirectLoop(response.headers.location, new URL(String(response.config.url)).origin);

        const targetUrlWithData = new URL(String(responseAuth.config.url));
        const state = targetUrlWithData.searchParams.get('state');
        const client = targetUrlWithData.searchParams.get('client');

        if (!state || !client) throw new ErrorDefault();

        return { state, client };
    }

    protected async redirectLoop(hrefToRedirect: string, prevHost: string): Promise<AxiosResponse<string>> {
        const correctUrl = /(http(s)?:\/\/.)+/gi.test(hrefToRedirect);
        const url = new URL(hrefToRedirect, correctUrl ? undefined : prevHost);

        const response = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: url.href,
                maxRedirects: 0,
                withCredentials: true,
            })
        );

        return response.status === HttpStatus.FOUND ? this.redirectLoop(response.headers.location, url.origin) : response;
    }
}
