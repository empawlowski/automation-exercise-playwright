import { type Locator, type Page, expect } from '@playwright/test';
import { HomePage } from './home.page';
import { ProductsPage } from './product.page';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { FooterComponent } from '../components/footer.component';
import { productData } from '../assets/data/e2e/product.data';
import { urlTitleData } from '../assets/data/e2e/url-title.data';

export class CartPage extends BasePage {
  private readonly homePage: HomePage;
  private readonly headerComponent: HeaderComponent;

  readonly cart: CartPage;

  readonly footer: FooterComponent;

  readonly product: ProductsPage;
  readonly addressDelivery: Locator;

  //?
  readonly rowForProduct: Locator;
  readonly cartPriceP1: Locator;
  readonly cartQuantityP1: Locator;
  readonly cartTotalPriceP1: Locator;
  readonly cartPriceP2: Locator;
  readonly cartQuantityP2: Locator;
  readonly cartTotalPriceP2: Locator;
  //?

  readonly addressInvoice: Locator;
  readonly fieldDescription: Locator;
  readonly buttonPlaceOrder: Locator;

  readonly fieldNameOnCard: Locator;
  readonly fieldCardNumber: Locator;
  readonly fieldCvc: Locator;
  readonly fieldExpiryMonth: Locator;
  readonly fieldExpiryYear: Locator;
  readonly buttonPay: Locator;
  readonly toastMessage: Locator;

  readonly buttonProceedToCheckout: Locator;
  readonly buttonRegisterLogin: Locator;

  readonly buttonDeleteQuantity: Locator;
  readonly divCartEmpty: Locator;

  readonly buttonDownloadInvoice: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(page);
    this.cart = new CartPage(page);
    this.product = new ProductsPage(page);

    this.footer = new FooterComponent(page);

    this.rowForProduct = this.page.locator('#cart_info_table').getByRole('row', { name: 'Product Image' });

    //TODO:
    this.cartPriceP1 = this.page.locator('#product-1').locator('.cart_price');
    this.cartQuantityP1 = this.page.locator('#product-1').locator('.cart_quantity');
    this.cartTotalPriceP1 = this.page.locator('#product-1').locator('.cart_total_price');
    this.cartPriceP2 = this.page.locator('#product-2').locator('.cart_price');
    this.cartQuantityP2 = this.page.locator('#product-2').locator('.cart_quantity');
    this.cartTotalPriceP2 = this.page.locator('#product-2').locator('.cart_total_price');
    //TODO:

    //Test Case 14: Place Order: Register while Checkout
    this.addressDelivery = page.locator('#address_delivery');
    this.addressInvoice = page.locator('#address_invoice');
    this.fieldDescription = page.locator('#ordermsg').locator('.form-control');
    this.buttonPlaceOrder = page.getByRole('link', { name: 'Place Order' });

    this.fieldNameOnCard = page.getByTestId('name-on-card');
    this.fieldCardNumber = page.getByTestId('card-number');
    this.fieldCvc = page.getByTestId('cvc');
    this.fieldExpiryMonth = page.getByTestId('expiry-month');
    this.fieldExpiryYear = page.getByTestId('expiry-year');
    this.buttonPay = page.getByTestId('pay-button');
    this.toastMessage = page.locator('#success_message');

    this.buttonProceedToCheckout = page.getByText('Proceed To Checkout');
    this.buttonRegisterLogin = page.getByRole('link', { name: 'Register / Login' });

    this.buttonDeleteQuantity = page.locator('a.cart_quantity_delete');
    this.divCartEmpty = page.locator('#empty_cart');

    //Test Case 24: Download Invoice after purchase order
    this.buttonDownloadInvoice = page.locator('.check_out');
    this.buttonContinue = page.locator('.btn-primary');
  }

  async expectCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(urlTitleData.urlCart);
    await expect(this.page).toHaveTitle(urlTitleData.cart);
  }

  //TODO: clear method
  async expectAddProducts() {
    await expect(this.cartPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartQuantityP1).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartPriceP2).toHaveText(productData.cartPriceP2);
    await expect(this.cartQuantityP2).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP2).toHaveText(productData.cartPriceP2);
  }

  async checkoutFromCartPage(): Promise<void> {
    await this.cart.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await this.buttonRegisterLogin.click();
  }

  async proceedToCheckout(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    // await this.headerComponent.cart.click();
    // await this.homePage.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.product.expectAddProductQuantity();
    await this.fieldDescription.fill(description);
    await this.buttonPlaceOrder.click();
  }

  async checkoutWithoutExpectProductQuantity(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.cart.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.fieldDescription.fill(description);
    await this.buttonPlaceOrder.click();
  }

  async proceedToCheckoutWithAddressVerification(deliveryAddress: string, deliveryInvoice: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.cart.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
  }

  async fillCartInformation(
    firstName: string,
    lastName: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string,
  ): Promise<void> {
    await this.fieldNameOnCard.fill(firstName + lastName);
    await this.fieldCardNumber.fill(cardNumber);
    await this.fieldCvc.fill(cvc);
    await this.fieldExpiryMonth.fill(expiryMonth);
    await this.fieldExpiryYear.fill(expiryYear);
    await this.buttonPay.click();
    await this.toastMessage.isVisible();
  }
}
