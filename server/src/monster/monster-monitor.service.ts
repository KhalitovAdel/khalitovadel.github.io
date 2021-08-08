import { Injectable, Logger } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

import { MonsterLogin } from './navigator/monster.login';

@Injectable()
export class MonsterMonitorService {
    protected readonly logger = new Logger(MonsterMonitorService.name);

    protected interval: NodeJS.Timer | undefined;

    protected readonly _isLogin = new BehaviorSubject(false);
    public readonly $isLogin = this._isLogin.asObservable();

    constructor(protected readonly login: MonsterLogin) {
        if (!this.login.state) {
            this.hasProblemWithCred();
        }
    }

    get isLogin(): boolean {
        return this._isLogin.getValue();
    }

    async hasProblemWithCred(): Promise<void> {
        await this.tryToReconnect();
    }

    protected async tryToReconnect(): Promise<void> {
        await this.reconnect();
        if (!this.isLogin) {
            this.interval = setInterval(this.reconnect.bind(this), 1000 * 60 * 5);
        }
    }

    protected async reconnect(): Promise<void> {
        try {
            await this.login.softLogout();
            await this.login.init();
        } catch (e) {
            this.logger.error('Error while connection with service: ' + e.message);
        }

        if (this.login.state) {
            if (this.interval) clearInterval(this.interval);
            this._isLogin.next(true);
            this.logger.log('Successfully connection with service');
        }
    }
}
