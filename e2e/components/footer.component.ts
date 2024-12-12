import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';

export class FooterComponent extends BasePage {
  readonly headerSubscription: Locator;
  readonly fieldSubscribe: Locator;
  readonly buttonSubscribe: Locator;
  readonly alertSuccessSubs: Locator;

  constructor(page: Page) {
    super(page);
    this.headerSubscription = this.page.getByRole('heading', { name: 'Subscription', exact: true });
    this.fieldSubscribe = page.getByRole('textbox', { name: 'Your email address' });
    this.buttonSubscribe = this.page.locator('#subscribe');
    this.alertSuccessSubs = this.page.locator('#success-subscribe');
  }

  async sendSubscribe(email: string): Promise<void> {
    await this.fieldSubscribe.fill(email);
    await this.buttonSubscribe.click();
  }
}
