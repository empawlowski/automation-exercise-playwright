import * as data from '@_e2e/assets/data/e2e/app.data.json';
import { ProductDetailsModel, ProductReviewModel } from '@_e2e/models/e2e/product-details.model';
import { BasePage } from '@_e2e/pages/e2e/base.page';
import { CartPage } from '@_e2e/pages/e2e/cart.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class ProductDetailsPage extends BasePage {
  private readonly productDetailsLocator: Locator;
  private readonly headerProductName: Locator;

  private readonly fieldQuantity: Locator;
  private readonly buttonAddToCart: Locator;
  private readonly linkViewCart: Locator;

  readonly linkWriteReview: Locator;
  private readonly fieldName: Locator;
  private readonly fieldEmail: Locator;
  private readonly fieldReview: Locator;
  private readonly buttonSubmit: Locator;
  private readonly alert: Locator;

  constructor(page: Page) {
    super(page);
    this.productDetailsLocator = page.locator('.product-information');
    this.headerProductName = this.productDetailsLocator.getByRole('heading');

    this.fieldQuantity = page.locator('#quantity');
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart' });
    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });

    this.linkWriteReview = page.getByRole('link', { name: 'Write Your Review' });
    this.fieldName = page.locator('#name');
    this.fieldEmail = page.locator('#email');
    this.fieldReview = page.locator('#review');
    this.buttonSubmit = page.locator('#button-review');
    this.alert = page.locator('#review-section');
  }

  getProductDetail(detail: string): Locator {
    return this.productDetailsLocator.locator('p', { hasText: detail });
  }

  async expectProductDetailsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/product_details/);
    await expect(this.page).toHaveTitle(data.title.productDetails);
  }

  async expectProductDetails(detail: ProductDetailsModel): Promise<void> {
    await expect.soft(this.headerProductName).toHaveText(detail.name);
    await expect.soft(this.getProductDetail(data.products.details.category)).toContainText(detail.category);
    await expect.soft(this.productDetailsLocator.filter({ hasText: data.products.details.price })).toContainText(detail.price);
    await expect.soft(this.getProductDetail(data.products.details.availability)).toContainText(detail.availability);
    await expect.soft(this.getProductDetail(data.products.details.condition)).toContainText(detail.condition);
    await expect.soft(this.getProductDetail(data.products.details.brand)).toContainText(detail.brand);
  }

  async addProductQuantity(quantity: string): Promise<void> {
    await this.fieldQuantity.fill(quantity);
  }

  async clickAddToCart(): Promise<void> {
    await this.buttonAddToCart.click();
  }

  async clickViewCart(): Promise<CartPage> {
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }

  async addProductReview(reviewData: ProductReviewModel): Promise<void> {
    await this.fieldName.fill(reviewData.name);
    await this.fieldEmail.fill(reviewData.email);
    await this.fieldReview.fill(reviewData.review);
    await this.buttonSubmit.click();
  }

  async expectSuccessReviewMessage(): Promise<void> {
    await expect(this.alert).toContainText('Thank you for your review.');
  }
}
