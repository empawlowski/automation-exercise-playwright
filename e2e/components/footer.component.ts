import { BasePage } from '@_e2e/pages/e2e/base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class FooterComponent extends BasePage {
  private readonly headerSubscription: Locator;
  private readonly fieldSubscribe: Locator;
  private readonly buttonSubscribe: Locator;
  private readonly alertSuccessSubs: Locator;

  constructor(page: Page) {
    super(page);
    this.headerSubscription = this.page.getByRole('heading', { name: 'Subscription', exact: true });
    this.fieldSubscribe = page.getByRole('textbox', { name: 'Your email address' });
    this.buttonSubscribe = this.page.locator('#subscribe');
    this.alertSuccessSubs = this.page.locator('#success-subscribe');
  }

  async isHeaderSubscriptionVisible(): Promise<void> {
    await expect(this.headerSubscription).toBeVisible();
  }

  async sendSubscribe(email: string): Promise<void> {
    await this.fieldSubscribe.fill(email);
    await this.buttonSubscribe.click();
  }

  async catchAlert(alert: string): Promise<void> {
    await expect(this.alertSuccessSubs).toContainText(alert);
  }
}
