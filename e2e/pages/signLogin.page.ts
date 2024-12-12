import { type Locator, type Page } from '@playwright/test';
// import { HomePage } from './home.page';
import { BasePage } from './base.page';
// import { HeaderComponent } from '../components/header.component';
// import { loginData } from '../assets/data/e2e/login.data';

export class SignupLoginPage extends BasePage {
  // readonly homePage: HomePage;
  // readonly headerComponent: HeaderComponent;

  constructor(page: Page) {
    super(page);
    // this.homePage = new HomePage(this.page);
    // this.headerComponent = new HeaderComponent(this.page);
  }

  //   async registerUser(
  //     username: string,
  //     email: string,
  //     password: string,
  //     days: string,
  //     months: string,
  //     years: string,
  //     firstName: string,
  //     lastName: string,
  //     country: string,
  //     company: string,
  //     address1: string,
  //     address2: string,
  //     state: string,
  //     city: string,
  //     zipCode: string,
  //     phoneNumber: string,
  //   ): Promise<void> {
  //     // await this.homePage.signLogin.click();
  //     // await expect(this.hSignup).toBeVisible();
  //     //!
  //     //? past for registerUser()
  //     // const userBaseData: UserSignupModel = createSignupUser();
  //     // await header.openSignupLoginPage();
  //     // await expect(login.headerSignup).toBeVisible();
  //     // await login.fillUserSignup(userBaseData);
  //     // await signup.expectAccountInformation(userBaseData);
  //     // await signup.expectAccountInformation(userBaseData);
  //     // await signup.fillBasicInformation(userBasicInfoData);
  //     // await signup.fillAddressInformation(userAddressInfoData);
  //     // await signup.clickCreateAccount();
  //     // await expect.soft(signup.create.headerAccountCreated).toContainText('Account Created!');
  //     // await signup.create.clickContinue();
  //     // await header.expectLoggedUser(userBaseData.name);
  //     //!
  //     // await this.fillSignupName.fill(username);
  //     // await this.fillSignupEmail.fill(email);
  //     // await this.bSignup.click();
  //     // await expect(this.inputSignupName).toHaveValue(username);
  //     // await expect(this.inputSignupEmail).toHaveValue(email);
  //     // await this.selectGender.click();
  //     // await this.fillPassword.fill(password);
  //     // await this.selectDays.selectOption(days);
  //     // await this.selectMonths.selectOption(months);
  //     // await this.selectYears.selectOption(years);
  //     // await this.selectNewsletter.click();
  //     // await this.selectOption.click();
  //     // await this.fillFirstName.fill(firstName);
  //     // await this.fillLastName.fill(lastName);
  //     // await this.fillCompany.fill(company);
  //     // await this.fillAddress1.fill(address1);
  //     // await this.fillAddress2.fill(address2);
  //     // await this.fillCountry.selectOption(country);
  //     // await this.fillState.fill(state);
  //     // await this.fillCity.fill(city);
  //     // await this.fillZipCode.fill(zipCode);
  //     // await this.fillMobileNumber.fill(phoneNumber);
  //     // await this.bCreateAccount.click();
  //     // await expect(this.hAccountCreated).toBeVisible();
  //     // await this.bContinue.click();
  //     // await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  //   }

  //   // async loginToAccount(email: string, password: string): Promise<void> {
  //   //   // await this.headerComponent.signLogin.click();
  //   //   await expect(this.hLogin).toBeVisible();
  //   //   await this.fieldLoginEmail.fill(email);
  //   //   await this.fieldLoginPassword.fill(password);
  //   //   await this.buttonLogin.click();
  //   // }
  //   // await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();

  //   // async deleteUser(): Promise<void> {
  //   //   await this.headerComponent.deleteAccount.click();
  //   //   //? return page?
  //   //   // await expect(this.hAccountDeleted).toBeVisible();
  //   //   // await this.bContinue.click();
  //   //   // await this.homePage.expectPage();
  //   // }
}
