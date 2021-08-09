import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';
import { lastValueFrom } from 'rxjs';

import cfg from '../../cfg';
import { CookieStorage } from '../../common/cookie.storage';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { ErrorDefault } from '../../error';

//TODO: move redirect to single function
@Injectable()
export class MonsterLogin {
    public state!: Record<string, string>;

    public token!: string;

    constructor(public readonly http: HttpService, @Inject(CustomProvider.MONSTER_IDENTITY__COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage) {}

    public isLogin(): boolean {
        return !!this.token && !!this.state;
    }

    public async logout(): Promise<void> {
        await Promise.resolve();
    }

    public async login(): Promise<void> {
        const { state, client: client_id } = await this.getInitDetails();

        const response = await lastValueFrom(
            this.http.request({
                method: 'POST',
                url: new URL(cfg.monster.routes.login, cfg.monster.hosts.identity).href,
                headers: { Cookie: this.cookieStorage.getCookieString() },
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

        const responseCb = await lastValueFrom(
            this.http.request({
                method: 'POST',
                url: new URL(cfg.monster.routes.loginCb, cfg.monster.hosts.identity).href,
                maxRedirects: 0,
                headers: {
                    Cookie: this.cookieStorage.getCookieString(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: payload,
            })
        );

        if (responseCb.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const responseAuthResume = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: new URL(responseCb.headers.location, cfg.monster.hosts.identity).href,
                maxRedirects: 0,
                withCredentials: true,
                headers: { Cookie: this.cookieStorage.getCookieString() },
            })
        );

        if (responseAuthResume.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const responseProfileAuthCB = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: responseAuthResume.headers.location,
                maxRedirects: 0,
                withCredentials: true,
                headers: { Cookie: this.cookieStorage.getCookieString() },
            })
        );

        if (responseProfileAuthCB.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const detailsPage = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: new URL(responseProfileAuthCB.headers.location, cfg.monster.hosts.monster).href,
                maxRedirects: 0,
                withCredentials: true,
                headers: { Cookie: this.cookieStorage.getCookieString() },
            })
        );

        if (detailsPage.status !== HttpStatus.OK || typeof detailsPage.data !== 'string') throw new ErrorDefault();

        const profile = new JSDOM(detailsPage.data, { runScripts: 'dangerously' });
        this.state = profile.window.__INITIAL_DATA__;
    }

    protected async goToProfileDetailPage(): Promise<AxiosResponse<unknown>> {
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

        return response;
    }

    //TODO: In last request, into html you can see how to encode state
    protected async getInitDetails(): Promise<{ state: string; client: string }> {
        const response = await this.goToProfileDetailPage();

        const responseAuth = await lastValueFrom(this.http.request({ method: 'GET', url: response.headers.location, maxRedirects: 0, withCredentials: true }));

        if (responseAuth.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const responseLogin = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: new URL(responseAuth.headers.location, cfg.monster.hosts.identity).href,
                maxRedirects: 0,
                withCredentials: true,
                headers: { Cookie: this.cookieStorage.getCookieString() },
            })
        );

        if (responseLogin.status !== HttpStatus.OK) throw new ErrorDefault();

        const targetUrlWithData = new URLSearchParams(responseAuth.headers.location.replace('/login', ''));

        const state = targetUrlWithData.get('state');
        const client = targetUrlWithData.get('client');

        if (!state || !client) throw new ErrorDefault();

        return { state, client };
    }
}
