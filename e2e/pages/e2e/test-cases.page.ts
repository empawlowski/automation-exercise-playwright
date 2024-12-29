import * as data from '@_e2e/assets/data/e2e/app.data.json';
import { BasePage } from '@_e2e/pages/e2e/base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class TestCasesPage extends BasePage {
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('heading', { name: 'Test Cases', exact: true });
  }

  async expectTestCasePage(): Promise<void> {
    await expect(this.page).toHaveURL('/test_cases');
    await expect(this.page).toHaveTitle(data.title.testCase);
    await expect(this.header).toBeVisible();
  }
}
