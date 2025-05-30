import { BasePage } from '@_e2e/pages/e2e/base.page';
import { HomePage } from '@_e2e/pages/e2e/home.page';
import { type Locator, type Page } from '@playwright/test';

export class AccountCreatedPage extends BasePage {
  readonly headerAccountCreated: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.headerAccountCreated = page.getByTestId('account-created');
    this.buttonContinue = page.getByTestId('continue-button');
  }

  async clickContinue(): Promise<HomePage> {
    await this.buttonContinue.click();
    return new HomePage(this.page);
  }
}
