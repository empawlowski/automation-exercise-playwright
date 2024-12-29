import { test as pagesTest } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/e2e/home.page';
import { ProductsPage } from '../pages/product.page';
import { ContactUsPage } from '../pages/contact-us.page';
import { TestCasesPage } from '../pages/test-cases.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { CheckoutPage } from '../pages/e2e/checkout.page';
import { PaymentPage } from '../pages/e2e/payment.page';

interface Pages {
  cart: CartPage;
  contactUs: ContactUsPage;
  checkout: CheckoutPage;
  home: HomePage;
  login: LoginPage;
  signup: SignupPage;
  payment: PaymentPage;
  products: ProductsPage;
  testCases: TestCasesPage;
}

export const pages = pagesTest.extend<Pages>({
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  contactUs: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signup: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  products: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  payment: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  testCases: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
});
