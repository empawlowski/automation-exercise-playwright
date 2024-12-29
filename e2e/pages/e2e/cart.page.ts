import * as data from '@_e2e/assets/data/e2e/app.data.json';
import { CartProductModel } from '@_e2e/models/e2e/cart.model';
import { LoginPage } from '@_e2e/pages/e2e/authentication/login.page';
import { BasePage } from '@_e2e/pages/e2e/base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage extends BasePage {
  readonly buttonProceedToCheckout: Locator;
  readonly buttonRegisterLogin: Locator;
  readonly rowForProduct: Locator;
  readonly cellDescription: Locator;
  readonly cellPrice: Locator;
  readonly cellQuantity: Locator;
  readonly cellTotalPrice: Locator;
  readonly buttonDeleteQuantity: Locator;
  readonly sectionCartEmpty: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonProceedToCheckout = page.locator('.check_out', { hasText: 'Proceed To Checkout' });
    this.buttonRegisterLogin = page.getByRole('link', { name: 'Register / Login' });
    this.rowForProduct = page.locator('#cart_info_table').getByRole('row', { name: 'Product Image' });
    this.cellDescription = page.locator('.cart_description');
    this.cellPrice = page.locator('.cart_price');
    this.cellQuantity = page.locator('.cart_quantity');
    this.cellTotalPrice = page.locator('.cart_total_price');
    this.buttonDeleteQuantity = page.locator('.cart_quantity_delete');
    this.sectionCartEmpty = page.locator('#empty_cart');
  }

  getProductName(productName: string): Locator {
    return this.page.getByRole('row', { name: productName });
  }

  async clickDeleteQuantityByName(productName: string): Promise<void> {
    await this.getProductName(productName).locator(this.buttonDeleteQuantity).click();
  }

  async expectCartPage(): Promise<void> {
    await expect(this.page).toHaveURL('/view_cart');
    await expect(this.page).toHaveTitle(data.title.cart);
  }

  async expectAddedOneProduct(product: CartProductModel): Promise<void> {
    const totalPrice: number = product.price! * Number(product.quantity);
    await expect(this.getProductName(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`);
    await expect(this.getProductName(product.name).locator(this.cellQuantity)).toHaveText(product.quantity);
    await expect(this.getProductName(product.name).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);
  }

  async expectAddedProducts(products: CartProductModel[]): Promise<void> {
    for (const product of products) {
      const totalPrice: number = product.price! * Number(product.quantity);
      await expect(this.getProductName(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`);
      await expect(this.getProductName(product.name).locator(this.cellQuantity)).toHaveText(product.quantity);
      await expect(this.getProductName(product.name).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);
    }
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.buttonProceedToCheckout.click();
  }

  async clickRegisterLogin(): Promise<LoginPage> {
    await this.buttonRegisterLogin.click();
    return new LoginPage(this.page);
  }

  async expectAddedProductAndQuantity(product: CartProductModel): Promise<void> {
    await expect(this.cellDescription).toContainText(product.name);
    await expect(this.cellQuantity).toHaveText(product.quantity);
  }
}
