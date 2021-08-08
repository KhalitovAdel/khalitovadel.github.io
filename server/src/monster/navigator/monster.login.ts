import { Inject, Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';

import cfg from '../../cfg';
import { CustomProvider } from '../../enum/custom-provider.enum';
import { IMonsterState } from '../interface/monster-state.interface';

@Injectable()
export class MonsterLogin {
    protected readonly profilesDetailHref = `a[href="${cfg.monster.routes.profileDetails}"]`;

    protected readonly emailInput = 'input[data-testid="auth0-email-input"]';

    protected readonly passwordInput = 'input[data-testid="auth0-password-input"]';

    protected readonly submitButton = 'button[data-testid="auth0-continue-with-email-button"]';

    protected readonly isOnProfile = 'div[data-testid="profile-application-history-tab-PROFILE"]';

    public state: IMonsterState | undefined;

    constructor(@Inject(CustomProvider.MONSTER_PAGE) public readonly page: Page) {}

    public async init(): Promise<void> {
        await this.goToLoginPage();
        await this.login(cfg.monster.auth.email, cfg.monster.auth.password);
        await this.initState();
    }

    public async softLogout(): Promise<void> {
        const client = await this.page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
    }

    protected async goToLoginPage(): Promise<void> {
        await this.page.goto(cfg.monster.routes.home);
        await this.page.waitForSelector(this.profilesDetailHref);
        await this.page.click(this.profilesDetailHref);
        await this.page.waitForSelector(this.emailInput);
    }

    protected async login(email: string, password: string): Promise<void> {
        await this.page.type(this.emailInput, email);
        await this.page.type(this.passwordInput, password);
        await this.page.click(this.submitButton);
        await this.page.waitForSelector(this.isOnProfile);
    }

    protected async initState(): Promise<void> {
        this.state = (await this.page.evaluate(() => (window as unknown as { __INITIAL_DATA__: unknown }).__INITIAL_DATA__)) as IMonsterState;
    }
}
