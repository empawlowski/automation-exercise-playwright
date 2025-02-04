import { Page } from '@playwright/test';

export class ScrollHelper {
  static async scrollToElement(page: Page, className: string): Promise<void> {
    await page.evaluate((selector: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'end' });
      } else {
        console.warn(`Element with selector '${selector}' not found`);
      }
    }, `.${className}`);
  }

  static async scrollDownPage(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  static async scrollUpPage(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }
}
