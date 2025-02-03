import { UserSignupModel } from '@_e2e/models/e2e/login.model';
import { UserSignupAddressInfoModel, UserSignupBasicInfoModel } from '@_e2e/models/e2e/signup.model';
import { BasePage } from '@_e2e/pages/e2e//base.page';
import { AccountCreatedPage } from '@_e2e/pages/e2e/authentication/account-created.page';
import { DeleteAccountPage } from '@_e2e/pages/e2e/authentication/delete-account.page';
import { LoginPage } from '@_e2e/pages/e2e/authentication/login.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class SignupPage extends BasePage {
  private readonly checkboxGenderMr: Locator;
  private readonly checkboxGenderMrs: Locator;
  private readonly fieldName: Locator;
  private readonly fieldEmail: Locator;

  private readonly fieldPassword: Locator;
  private readonly selectDays: Locator;
  private readonly selectMonths: Locator;
  private readonly selectYears: Locator;

  private readonly checkboxNewsletter: Locator;
  private readonly checkboxOffers: Locator;

  private readonly fieldFirstName: Locator;
  private readonly fieldLastName: Locator;
  private readonly fieldCompany: Locator;
  private readonly fieldAddress: Locator;
  private readonly fieldAddress2: Locator;
  private readonly fieldCountry: Locator;
  private readonly fieldState: Locator;
  private readonly fieldCity: Locator;
  private readonly fieldZipCode: Locator;
  private readonly fieldMobileNumber: Locator;

  private readonly buttonCreateAccount: Locator;

  readonly create: AccountCreatedPage;
  readonly delete: DeleteAccountPage;
  readonly login: LoginPage;

  constructor(page: Page) {
    super(page);
    this.checkboxGenderMr = page.locator('#id_gender1');
    this.checkboxGenderMrs = page.locator('#id_gender2');
    this.fieldName = page.getByTestId('name');
    this.fieldEmail = page.getByTestId('email');

    this.fieldPassword = page.getByTestId('password');
    this.selectDays = page.getByTestId('days');
    this.selectMonths = page.getByTestId('months');
    this.selectYears = page.getByTestId('years');

    this.checkboxNewsletter = page.locator('#newsletter');
    this.checkboxOffers = page.locator('#optin');

    this.fieldFirstName = page.getByTestId('first_name');
    this.fieldLastName = page.getByTestId('last_name');
    this.fieldCompany = page.getByTestId('company');
    this.fieldAddress = page.getByTestId('address');
    this.fieldAddress2 = page.getByTestId('address2');
    this.fieldCountry = page.getByTestId('country');
    this.fieldState = page.getByTestId('state');
    this.fieldCity = page.getByTestId('city');
    this.fieldZipCode = page.getByTestId('zipcode');
    this.fieldMobileNumber = page.getByTestId('mobile_number');

    this.buttonCreateAccount = page.getByTestId('create-account');

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
