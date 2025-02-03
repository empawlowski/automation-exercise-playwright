import * as data from '@_e2e/assets/data/e2e/app.data.json';
import { UserLoginModel, UserSignupModel } from '@_e2e/models/e2e/login.model';
import { SignupPage } from '@_e2e/pages/e2e/authentication/signup.page';
import { BasePage } from '@_e2e/pages/e2e/base.page';
import { HomePage } from '@_e2e/pages/e2e/home.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly headerLogin: Locator;
  private readonly fieldLoginEmail: Locator;
  private readonly fieldLoginPassword: Locator;
  readonly paragraphLoginIncorrectData: Locator;
  private readonly buttonLogin: Locator;

  readonly headerSignup: Locator;
  private readonly fieldSignupName: Locator;
  private readonly fieldSignupEmail: Locator;
  readonly paragraphSignupIncorrectData: Locator;
  private readonly buttonSignup: Locator;

  constructor(page: Page) {
    super(page);
    this.headerLogin = page.getByRole('heading', { name: 'Login to your account' });
    this.fieldLoginEmail = page.getByTestId('login-email');
    this.fieldLoginPassword = page.getByTestId('login-password');
    this.paragraphLoginIncorrectData = page.locator('.login-form', { hasText: data.login.incorrectData });
    this.buttonLogin = page.getByTestId('login-button');

    this.headerSignup = page.getByRole('heading', { name: 'New User Signup!' });
    this.fieldSignupName = page.getByTestId('signup-name');
    this.fieldSignupEmail = page.getByTestId('signup-email');
    this.paragraphSignupIncorrectData = page.locator('.signup-form', { hasText: data.login.emailExist });
    this.buttonSignup = page.getByTestId('signup-button');
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('/login');
    await expect(this.page).toHaveTitle(data.title.login);
  }

  async loginToAccount(user: UserLoginModel): Promise<HomePage> {
    await this.fieldLoginEmail.fill(user.email as string);
    await this.fieldLoginPassword.fill(user.password as string);
    await this.buttonLogin.click();
    return new HomePage(this.page);
  }

  async fillUserSignup(user: UserSignupModel): Promise<SignupPage> {
    await this.fieldSignupName.fill(user.name);
    await this.fieldSignupEmail.fill(user.email);
    await this.buttonSignup.click();
    return new SignupPage(this.page);
  }
}
