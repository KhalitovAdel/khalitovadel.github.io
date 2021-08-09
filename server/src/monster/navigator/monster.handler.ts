//https://docs.nestjs.com/techniques/queues
//if !isLogin pause schedule. if isLogin play
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

import cfg from '../../cfg';
import { ErrorDefault } from '../../error';
import { MonsterUtil } from './monster.util';

export class MonsterHandler {
    constructor(@Inject(HttpService) protected readonly http: HttpService, protected readonly util: MonsterUtil) {}

    protected getRedirectUrl(jobId: string): string {
        return cfg.monster.routes.jobSearch.concat('?appliedJobId=', jobId);
    }

    protected getUrl(jobId: string): URL {
        const url = new URL(cfg.monster.routes.applyStart, cfg.monster.hosts.monster);
        url.searchParams.set('jobId', jobId);
        url.searchParams.set('redirectUri', this.getRedirectUrl(jobId));

        return url;
    }

    protected async handleJob(jobId: string): Promise<void> {
        const url = this.getUrl(jobId);
        const response = await lastValueFrom(
            this.http.request({
                method: 'GET',
                url: url.href,
                maxRedirects: 0,
            })
        );

        if (response.status !== HttpStatus.FOUND) throw new ErrorDefault();

        const middleOrFinallyResponse = await this.util.redirectLoop(response.headers.location, url.origin);

        const currentUrl = new URL(String(middleOrFinallyResponse.config.url));

        const finallyResponse = currentUrl.pathname === cfg.monster.routes.jobSearch ? middleOrFinallyResponse : await this.continue(jobId);

        const finallyUrl = new URL(String(finallyResponse.config.url));

        if (finallyUrl.pathname !== cfg.monster.routes.jobSearch) throw new ErrorDefault();
    }

    protected async continue(jobId: string): Promise<AxiosResponse<string>> {
        const payload = new URLSearchParams();
        payload.append('jobId', jobId);
        payload.append('svxRedirectUri', this.getRedirectUrl(jobId));
        payload.append('result', 'ep');
        payload.append('resumeType', 'structured');

        const url = new URL(cfg.monster.routes.applyContinue, cfg.monster.hosts.monster);

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

        return this.util.redirectLoop(response.headers.location, url.origin);
    }
}
