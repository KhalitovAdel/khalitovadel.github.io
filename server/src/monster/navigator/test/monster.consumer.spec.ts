import { Test, TestingModule } from '@nestjs/testing';

import { MonsterModule } from '../../monster.module';
import { MonsterConsumer } from '../monster.consumer';
import { MonsterLogin } from '../monster.login';

// TODO Write all tests for consumer
describe('MonsterConsumer', () => {
    let service: MonsterConsumer;
    let loginService: MonsterLogin;
    jest.setTimeout(1000 * 60 * 2);
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MonsterModule],
        }).compile();

        await module.init();
        service = module.get(MonsterConsumer);
        loginService = module.get(MonsterLogin);
    });

    it('should handleJob works', async () => {
        await loginService.login();
        await expect(service['handleJob']('2c2a0c46-7953-455c-bbd5-05985db0360e')).resolves;
    });
});
