import { BasePage } from '@_e2e/pages/e2e/base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class CategoryProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getHeaderName(header: string): Locator {
    return this.page.getByRole('heading', { name: header });
  }

  async expectCategoryProductsPage(title: string): Promise<void> {
    await expect(this.page).toHaveURL(/category_products/);
    await expect(this.page).toHaveTitle(title);
  }
}
