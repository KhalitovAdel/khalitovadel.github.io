import { Test, TestingModule } from '@nestjs/testing';

import { MonsterModule } from '../../monster.module';
import { MonsterLogin } from '../monster.login';
import { MonsterWatcher } from '../monster.watcher';

describe('MonsterWatcher', () => {
    let service: MonsterWatcher;
    let loginService: MonsterLogin;
    jest.setTimeout(1000 * 60 * 2);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MonsterModule],
        }).compile();

        await module.init();
        service = module.get(MonsterWatcher);
        loginService = module.get(MonsterLogin);
    });

    it('should listJob works', async () => {
        await loginService.login();

        const jobs = await service['listJob']({ filter: { query: 'javascript', region: 'us' } });

        expect(jobs).toBeDefined();
        expect(Array.isArray(jobs.jobResults) && jobs.jobResults.length).toBeDefined();
    });

    it('should listJob excludes works', async () => {
        await loginService.login();

        const jobs = await service['listJob']({ filter: { query: 'javascript', region: 'us' } });

        const randomJobId = jobs.jobResults[0].jobId;

        const result = await service['listJob']({ filter: { query: 'javascript', region: 'us', excludeIds: [randomJobId] } });

        expect(result).toBeDefined();
        expect(Array.isArray(result.jobResults) && result.jobResults.length).toBeDefined();

        expect(result.jobResults.find((el) => el.jobId === randomJobId)).not.toBeDefined();
    });
});
