import { BasePage } from '@_e2e/pages/e2e/base.page';
import { type Locator, type Page } from '@playwright/test';

export class SliderComponent extends BasePage {
  private readonly buttonTestCases: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonTestCases = page.getByRole('button', { name: 'Test Cases', exact: true });
  }

  async openTestCasesFromSlider(): Promise<void> {
    await this.buttonTestCases.click();
  }
}
