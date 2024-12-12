import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { productDetailsData } from '../assets/data/e2e/product-details.data';
import { ProductDetailsModel } from '../models/product-details.model';

export class ProductDetailsPage extends BasePage {
  readonly productDetailsLocator: Locator;
  readonly headerProductName: Locator;

  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  constructor(page: Page) {
    super(page);
    this.productDetailsLocator = page.locator('.product-information');
    this.headerProductName = this.productDetailsLocator.getByRole('heading');
  }

  getProductDetail(detail: string): Locator {
    return this.productDetailsLocator.locator('p', { hasText: detail });
  }

  async expectProductDetailsPage(): Promise<void> {
    await expect(this.page).toHaveURL(urlTitleData.urlProductDetails);
    await expect(this.page).toHaveTitle(urlTitleData.productDetails);
  }

  async expectProductDetails(detail: ProductDetailsModel): Promise<void> {
    await expect.soft(this.headerProductName).toHaveText(detail.name);
    await expect.soft(this.getProductDetail(productDetailsData.category)).toContainText(detail.category);
    await expect.soft(this.productDetailsLocator.filter({ hasText: productDetailsData.price })).toContainText(detail.price);
    await expect.soft(this.getProductDetail(productDetailsData.availability)).toContainText(detail.availability);
    await expect.soft(this.getProductDetail(productDetailsData.condition)).toContainText(detail.condition);
    await expect.soft(this.getProductDetail(productDetailsData.brand)).toContainText(detail.brand);
  }
}
