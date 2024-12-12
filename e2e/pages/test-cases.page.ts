import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { urlTitleData } from '../assets/data/e2e/url-title.data';

export class TestCasesPage extends BasePage {
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('heading', { name: 'Test Cases', exact: true });
  }

  async expectTestCasePage(): Promise<void> {
    await expect(this.page).toHaveURL(urlTitleData.urlTestCases);
    await expect(this.page).toHaveTitle(urlTitleData.testCase);
    await expect(this.header).toBeVisible();
  }
}
