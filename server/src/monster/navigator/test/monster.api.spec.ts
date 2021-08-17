import { Test, TestingModule } from '@nestjs/testing';

import { MonsterModule } from '../../monster.module';
import { MonsterApi } from '../monster.api';

describe('MonsterApi', () => {
    let service: MonsterApi;

    jest.setTimeout(1000 * 60 * 2);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MonsterModule],
        }).compile();

        await module.init();
        service = module.get(MonsterApi);
    });

    it('should getInitDetails works', async () => {
        const { state, client } = await service['getInitDetails']();
        expect(state).toBeDefined();
        expect(client).toBeDefined();
    });

    it('should login works', async () => {
        const { state } = await service.login();

        expect(state).toBeDefined();
    });

    it('should listJob works', async () => {
        const jobs = await service.listJob({ filter: { query: 'javascript' } });

        expect(jobs).toBeDefined();
        expect(Array.isArray(jobs.jobResults) && jobs.jobResults.length).toBeDefined();
    });

    it('should listJob excludes works', async () => {
        const jobs = await service.listJob({ filter: { query: 'javascript' } });

        const randomJobId = jobs.jobResults[0].jobId;

        const result = await service.listJob({ filter: { query: 'javascript', excludeIds: [randomJobId] } });

        expect(result).toBeDefined();
        expect(Array.isArray(result.jobResults) && result.jobResults.length).toBeDefined();

        expect(result.jobResults.find((el) => el.jobId === randomJobId)).not.toBeDefined();
    });
});
