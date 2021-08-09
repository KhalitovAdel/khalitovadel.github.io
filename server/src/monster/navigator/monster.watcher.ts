import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import cfg from '../../cfg';
import { CookieStorage } from '../../common/cookie.storage';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { IListArg } from '../interface/monster.watcher.interface';
import { IMonsterJob, IMonsterJonResponse } from '../interface/monster-jobs.interface';

@Injectable()
export class MonsterWatcher implements OnModuleInit {
    protected fingerPrint!: string | null;

    constructor(
        @Inject(HttpService) protected readonly http: HttpService,
        @Inject(CustomProvider.MONSTER_IDENTITY__COOKIE_STORAGE) protected readonly cookieStorage: CookieStorage
    ) {}

    async onModuleInit(): Promise<void> {
        await this.init();
    }

    get isInit(): boolean {
        return !!this.fingerPrint;
    }

    async init(): Promise<void> {
        await Promise.resolve();
    }

    // TODO: decorate that method as cron
    // TODO: check monitor, if (!isLogin) return;
    protected async cronJob(): Promise<void> {
        await Promise.all(cfg.monster.jobQuery.addresses.map((address) => cfg.monster.jobQuery.positions.map((position) => this.unitHandlerOfTask(address, position))));
    }

    protected async unitHandlerOfTask(address: string, query: string): Promise<void> {
        // TODO: Find all existing positions
        const excludeIds: IListArg['filter']['excludeIds'] = [];
        let hasResult = true;
        const limit = 10;
        let skip = 0;

        while (hasResult) {
            const { jobResults } = await this.listJob({ filter: { excludeIds, address, query }, limit, skip });

            hasResult = !!jobResults.length;
            skip += limit;

            //Error from here doesn't mater
            this.handleJobs(jobResults || []).catch((e) => e);
        }
    }

    protected async handleJobs(jobs: IMonsterJonResponse['jobResults']): Promise<void> {
        await Promise.all(jobs.filter((job) => job.apply.applyType === 'INTEGRATED').map((job) => this.handleJob(job)));
    }

    // TODO: need tests for pagination, does sort of jobResult is strict
    protected async handleJob(_job: IMonsterJob): Promise<void> {
        // TODO: save job to database before sending to queue
        // TODO: send to queue
    }

    protected async listJob(params: IListArg): Promise<IMonsterJonResponse> {
        const url = new URL(cfg.monster.routes.jobSearchApi, cfg.monster.hosts.api);

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
}
