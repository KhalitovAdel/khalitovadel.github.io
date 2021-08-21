import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';
import { lastValueFrom } from 'rxjs';

import cfg from '../../cfg';
import { CookieStorage } from '../../common/cookie.storage';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { ErrorDefault } from '../../error';
import { IListArg } from '../interface/monster.watcher.interface';
import { IMonsterJonResponse } from '../interface/monster-jobs.interface';
import { IMonsterState } from '../interface/monster-state.interface';

export class MonsterApi {
    constructor(
        @Inject(HttpService) protected readonly http: HttpService,
        @Inject(CustomProvider.MONSTER_IDENTITY_COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage
    ) {}

    public async listJob(params: IListArg): Promise<IMonsterJonResponse> {
        const url = new URL(cfg.monster.route.jobSearchApi, cfg.monster.origin.api);

        return lastValueFrom(
            this.http.request<IMonsterJonResponse>({
                method: 'POST',
                url: url.href,
                data: {
                    jobQuery: {
                        locations: [
                            {
                                address: params.filter.address || '',
                                country: 'us',
                                radius: {
                                    unit: 'mi',
                                    value: '100',
                                },
                            },
                        ],
                        excludeJobs: params.filter.excludeIds || [],
                        companyDisplayNames: [],
                        query: params.filter.query,
                    },
                    offset: params.skip || 0,
                    pageSize: params.limit || 10,
                    searchId: '',
                    includeJobs: [],
                    jobAdsRequest: {
                        position: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        placement: {
                            component: 'JSR_LIST_VIEW',
                            appName: 'monster',
                        },
                    },
                },
            })
        ).then(({ data }) => data);
    }

    public async login(): Promise<{ state: IMonsterState }> {
        const { state, client: client_id } = await this.getInitDetails();

        const response = await lastValueFrom(
            this.http.request({
                method: 'POST',
                url: new URL(cfg.monster.route.login, cfg.monster.origin.identity).href,
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
        const token = (form.window.document.querySelector('input[name="wresult"]') as HTMLInputElement).value;
        const localState = (form.window.document.querySelector('input[name="wctx"]') as HTMLInputElement).value;
        const wa = (form.window.document.querySelector('input[name="wa"]') as HTMLInputElement).value;

        const payload = new URLSearchParams();
        payload.append('wa', wa);
        payload.append('wresult', token);
        payload.append('wctx', localState);

        const urlCb = new URL(cfg.monster.route.loginCb, cfg.monster.origin.identity);
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
        const finallyState = profile.window.__INITIAL_DATA__;

        return { state: finallyState };
    }

    public async handleJob(jobId: string): Promise<AxiosResponse<string>> {
        const url = this.getUrl(jobId);
        const response = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: url.href,
                maxRedirects: 0,
            })
        );

        if (response.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const middleOrFinallyResponse = await this.redirectLoop(response.headers.location, url.origin);

        const currentUrl = new URL(String(middleOrFinallyResponse.config.url));

        const finallyResponse = currentUrl.pathname === cfg.monster.route.jobSearch ? middleOrFinallyResponse : await this.continue(jobId);

        const finallyUrl = new URL(String(finallyResponse.config.url));

        if (finallyUrl.pathname !== cfg.monster.route.jobSearch) throw new ErrorDefault();

        return finallyResponse;
    }

    protected async continue(jobId: string): Promise<AxiosResponse<string>> {
        const payload = new URLSearchParams();
        payload.append('jobId', jobId);
        payload.append('svxRedirectUri', this.getRedirectUrl(jobId));
        payload.append('result', 'ep');
        payload.append('resumeType', 'structured');

        const url = new URL(cfg.monster.route.applyContinue, cfg.monster.origin.monster);

        const response = await lastValueFrom(
            this.http.request({
                method: 'POST',
                url: url.href,
                maxRedirects: 0,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: payload,
            })
        );

        return this.redirectLoop(response.headers.location, url.origin);
    }

    protected getUrl(jobId: string): URL {
        const url = new URL(cfg.monster.route.applyStart, cfg.monster.origin.monster);
        url.searchParams.set('jobId', jobId);
        url.searchParams.set('redirectUri', this.getRedirectUrl(jobId));

        return url;
    }

    protected getRedirectUrl(jobId: string): string {
        return cfg.monster.route.jobSearch.concat('?appliedJobId=', jobId);
    }

    // In last request, into html you can see how to encode state
    protected async getInitDetails(): Promise<{ state: string; client: string }> {
        const detailsUrl = new URL(cfg.monster.route.profileDetails, cfg.monster.origin.monster);
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

    // TODO: make that function protected
    public async redirectLoop<T = string>(hrefToRedirect: string, prevHost: string): Promise<AxiosResponse<T>> {
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
