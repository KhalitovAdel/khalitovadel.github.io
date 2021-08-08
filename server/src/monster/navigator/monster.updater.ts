import { Injectable } from '@nestjs/common';

import { MonsterLogin } from './monster.login';

//Get token from monster login, subscribe isLogin true, when he recieve isLogin start update onModuleInit
@Injectable()
export class MonsterUpdater {
    constructor(protected readonly service: MonsterLogin) {}
}
