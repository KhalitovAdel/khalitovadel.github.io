import { Test, TestingModule } from '@nestjs/testing';

import { CookieStorage } from '../../../common/cookie.storage';
import { CustomProvider } from '../../../enum/custom-provider.enum';
import { MonsterModule } from '../../monster.module';
import { MonsterLogin } from '../monster.login';

describe('MonsterLogin', () => {
    let service: MonsterLogin;
    let cookieStorage: CookieStorage;

    jest.setTimeout(1000 * 60 * 2);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MonsterModule],
        }).compile();

        await module.init();
        service = module.get(MonsterLogin);
        cookieStorage = module.get(CustomProvider.MONSTER_IDENTITY_COOKIE_STORAGE);
    });

    afterEach(async () => {
        await service.logout();
    });

    it('should login works', async () => {
        await service.login();

        expect(service['state']).toBeDefined();
        expect(service.token).toBeDefined();
        expect(service.isLogin).toEqual(true);
    });

    it('should logout clear state && cookie', async () => {
        await service.login();
        await service.logout();

        expect(service.isLogin).toEqual(false);

        expect(service['state']).toEqual(null);
        expect(service.token).toEqual(null);

        expect(cookieStorage.getCookieString()).toEqual('');
    });
});
