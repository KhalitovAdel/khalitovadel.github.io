import { Test, TestingModule } from '@nestjs/testing';

import { MonsterModule } from '../../monster.module';
import { MonsterLogin } from '../monster.login';
import { MonsterWatcher } from '../monster.watcher';

// TODO: write all tests
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
});
