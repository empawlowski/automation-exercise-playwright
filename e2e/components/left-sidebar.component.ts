import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../pages/e2e/base.page';
import { BrandProducts } from '../pages/e2e/brand-products.page';
import { CategoryProductsPage } from '../pages/category-products.page';

export class LeftSidebarComponent extends BasePage {
  readonly sidebarLocator: Locator;
  readonly headerSidebarCategory: Locator;
  readonly headerSidebarBrands: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarLocator = page.locator('#accordian');
    this.headerSidebarCategory = page.locator('.left-sidebar').getByRole('heading', { name: 'Category' });
    this.headerSidebarBrands = page.locator('.left-sidebar').getByRole('heading', { name: 'Brands' });
  }

  getCategory(category: string): Locator {
    return this.page.getByRole('link', { name: ` ${category}` });
  }

  getCategoryProducts(products: string): Locator {
    return this.page.getByRole('link', { name: products });
  }

  getBrandName(brand: string): Locator {
    return this.page.getByRole('link', { name: brand });
  }

  async expectLeftSidebar() {
    await expect(this.sidebarLocator).toBeVisible();
    await expect(this.headerSidebarCategory).toBeVisible();
    await expect(this.headerSidebarBrands).toBeVisible();
  }

  async openCategoryByName(category: string): Promise<void> {
    await this.getCategory(category).click();
  }

  async openCategoryProductsByName(products: string): Promise<CategoryProductsPage> {
    await this.getCategoryProducts(products).click();
    return new CategoryProductsPage(this.page);
  }

  async openBrandByName(brand: string): Promise<BrandProducts> {
    await this.getBrandName(brand).click();
    return new BrandProducts(this.page);
  }
}
