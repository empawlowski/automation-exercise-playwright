import { BasePage } from '@_e2e/pages/e2e/base.page';
import { BrandProducts } from '@_e2e/pages/e2e/products/brand-products.page';
import { CategoryProductsPage } from '@_e2e/pages/e2e/products/category-products.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class LeftSidebarComponent extends BasePage {
  private readonly sidebarLocator: Locator;
  private readonly headerSidebarCategory: Locator;
  private readonly headerSidebarBrands: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarLocator = page.locator('#accordian');
    this.headerSidebarCategory = page.locator('.left-sidebar').getByRole('heading', { name: 'Category' });
    this.headerSidebarBrands = page.locator('.left-sidebar').getByRole('heading', { name: 'Brands' });
  }

  private getCategory(category: string): Locator {
    return this.page.getByRole('link', { name: ` ${category}` });
  }

  private getCategoryProducts(products: string): Locator {
    return this.page.getByRole('link', { name: products });
  }

  private getBrandName(brand: string): Locator {
    return this.page.getByRole('link', { name: brand });
  }

  async expectLeftSidebar(): Promise<void> {
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
