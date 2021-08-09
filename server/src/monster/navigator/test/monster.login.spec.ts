import { Test, TestingModule } from '@nestjs/testing';

import { MonsterModule } from '../../monster.module';
import { MonsterLogin } from '../monster.login';

describe('MonsterLogin', () => {
    let service: MonsterLogin;
    jest.setTimeout(1000 * 60 * 2);
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MonsterModule],
        }).compile();

        await module.init();
        service = module.get(MonsterLogin);
    });

    it('should getInitDetails works', async () => {
        const { state, client } = await service['getInitDetails']();
        expect(state).toBeDefined();
        expect(client).toBeDefined();
    });

    it('should login works', async () => {
        await service.login();

        expect(service.state).toBeDefined();
        expect(service.token).toBeDefined();
    });
});
