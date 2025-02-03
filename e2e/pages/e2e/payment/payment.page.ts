import { CardInfoModel } from '@_e2e/models/e2e/payment.model';
import { BasePage } from '@_e2e/pages/e2e/base.page';
import { PaymentDonePage } from '@_e2e/pages/e2e/payment/payment-done.page';
import { type Locator, type Page } from '@playwright/test';

export class PaymentPage extends BasePage {
  private readonly fieldNameOnCard: Locator;
  private readonly fieldCardNumber: Locator;
  private readonly fieldCvc: Locator;
  private readonly fieldExpiryMonth: Locator;
  private readonly fieldExpiryYear: Locator;
  private readonly buttonPayAndConfirm: Locator;
  private readonly alert: Locator;

  readonly done: PaymentDonePage;

  constructor(page: Page) {
    super(page);
    this.fieldNameOnCard = page.getByTestId('name-on-card');
    this.fieldCardNumber = page.getByTestId('card-number');
    this.fieldCvc = page.getByTestId('cvc');
    this.fieldExpiryMonth = page.getByTestId('expiry-month');
    this.fieldExpiryYear = page.getByTestId('expiry-year');
    this.buttonPayAndConfirm = page.getByTestId('pay-button');
    this.alert = page.locator('#success_message');

    this.done = new PaymentDonePage(this.page);
  }

  async fillCardInformation(card: CardInfoModel): Promise<void> {
    await this.fieldNameOnCard.fill(card.fullName);
    await this.fieldCardNumber.fill(card.cardNumber);
    await this.fieldCvc.fill(card.cvc);
    await this.fieldExpiryMonth.fill(card.expiryMonth);
    await this.fieldExpiryYear.fill(card.expiryYear);
  }

  private async isAlertVisible(): Promise<void> {
    await this.alert.isVisible();
  }

  async clickPayAndConfirm(): Promise<PaymentDonePage> {
    await this.buttonPayAndConfirm.click();
    await this.isAlertVisible();
    return new PaymentDonePage(this.page);
  }
}
