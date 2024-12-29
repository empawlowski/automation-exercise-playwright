import { UserSignupModel } from '@_e2e/models/e2e/login.model';
import { UserSignupAddressInfoModel, UserSignupBasicInfoModel } from '@_e2e/models/e2e/signup.model';
import { BasePage } from '@_e2e/pages/e2e//base.page';
import { AccountCreatedPage } from '@_e2e/pages/e2e/authentication/account-created.page';
import { DeleteAccountPage } from '@_e2e/pages/e2e/authentication/delete-account.page';
import { LoginPage } from '@_e2e/pages/e2e/authentication/login.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class SignupPage extends BasePage {
  readonly checkboxGenderMr: Locator;
  readonly checkboxGenderMrs: Locator;
  readonly fieldName: Locator;
  readonly fieldEmail: Locator;

  readonly fieldPassword: Locator;
  readonly selectDays: Locator;
  readonly selectMonths: Locator;
  readonly selectYears: Locator;

  readonly checkboxNewsletter: Locator;
  readonly checkboxOffers: Locator;

  readonly fieldFirstName: Locator;
  readonly fieldLastName: Locator;
  readonly fieldCompany: Locator;
  readonly fieldAddress: Locator;
  readonly fieldAddress2: Locator;
  readonly fieldCountry: Locator;
  readonly fieldState: Locator;
  readonly fieldCity: Locator;
  readonly fieldZipCode: Locator;
  readonly fieldMobileNumber: Locator;

  readonly buttonCreateAccount: Locator;
  readonly buttonContinue: Locator;

  readonly create: AccountCreatedPage;
  readonly delete: DeleteAccountPage;
  readonly login: LoginPage;

  constructor(page: Page) {
    super(page);
    this.checkboxGenderMr = this.page.locator('#id_gender1');
    this.checkboxGenderMrs = this.page.locator('#id_gender2');
    this.fieldName = page.getByTestId('name');
    this.fieldEmail = page.getByTestId('email');

    this.fieldPassword = page.getByTestId('password');
    this.selectDays = this.page.getByTestId('days');
    this.selectMonths = this.page.getByTestId('months');
    this.selectYears = this.page.getByTestId('years');

    this.checkboxNewsletter = this.page.locator('#newsletter');
    this.checkboxOffers = this.page.locator('#optin');

    this.fieldFirstName = this.page.getByTestId('first_name');
    this.fieldLastName = this.page.getByTestId('last_name');
    this.fieldCompany = this.page.getByTestId('company');
    this.fieldAddress = this.page.getByTestId('address');
    this.fieldAddress2 = this.page.getByTestId('address2');
    this.fieldCountry = this.page.getByTestId('country');
    this.fieldState = this.page.getByTestId('state');
    this.fieldCity = this.page.getByTestId('city');
    this.fieldZipCode = this.page.getByTestId('zipcode');
    this.fieldMobileNumber = this.page.getByTestId('mobile_number');

    this.buttonCreateAccount = this.page.getByTestId('create-account');
    this.buttonContinue = this.page.getByTestId('continue-button');

    this.create = new AccountCreatedPage(page);
    this.delete = new DeleteAccountPage(page);
    this.login = new LoginPage(page);
  }

  private async expectAccountInformation(user: UserSignupModel): Promise<void> {
    await expect(this.fieldName).toHaveValue(user.name);
    await expect(this.fieldEmail).toHaveValue(user.email);
  }

  private async fillBasicInformation(user: UserSignupBasicInfoModel): Promise<void> {
    await this.checkboxGenderMrs.click();
    await this.fieldPassword.fill(user.password);
    await this.selectDays.selectOption(user.day);
    await this.selectMonths.selectOption(user.month);
    await this.selectYears.selectOption(user.year);
  }

  private async selectNewsletterAndOffers(): Promise<void> {
    await this.checkboxNewsletter.click();
    await this.checkboxOffers.click();
  }

  private async fillAddressInformation(user: UserSignupAddressInfoModel): Promise<void> {
    await this.fieldFirstName.fill(user.firstName);
    await this.fieldLastName.fill(user.lastName);
    await this.fieldCompany.fill(user.company);
    await this.fieldAddress.fill(user.address);
    await this.fieldAddress2.fill(user.address2);
    await this.fieldCountry.selectOption(user.country);
    await this.fieldState.fill(user.state);
    await this.fieldCity.fill(user.city);
    await this.fieldZipCode.fill(user.zipCode);
    await this.fieldMobileNumber.fill(user.phoneNumber);
  }

  private async clickCreateAccount(): Promise<AccountCreatedPage> {
    await this.buttonCreateAccount.click();
    return new AccountCreatedPage(this.page);
  }

  async registerUser(
    userBaseData: UserSignupModel,
    userBasicInfoData: UserSignupBasicInfoModel,
    userAddressInfoData: UserSignupAddressInfoModel,
  ): Promise<void> {
    await this.login.fillUserSignup(userBaseData);
    await this.expectAccountInformation(userBaseData);
    await this.fillBasicInformation(userBasicInfoData);
    await this.selectNewsletterAndOffers();
    await this.fillAddressInformation(userAddressInfoData);
    await this.clickCreateAccount();
  }
}
