import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

export class MonsterUtil {
    constructor(@Inject(HttpService) protected readonly http: HttpService) {}

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
