import { faker } from '@faker-js/faker';
import { userData } from '../../assets/data/e2e/user.data';
import { homeData } from '../../assets/data/e2e/home.data';
import { productData } from '../../assets/data/e2e/product.data';
import { cartData } from '../../assets/data/e2e/cart.data';
import { test } from '../../fixtures/base.fixture';
import { expect } from '@playwright/test';
import { contactUsData } from '../../assets/data/e2e/contact-us.data';
import { createFakeLoginUser, createSignupUser } from '../../factories/login.factory';
import { UserLoginModel, UserSignupModel } from '../../models/login.model';
import { UserSignupAddressInfoModel, UserSignupBasicInfoModel } from '../../models/signup.model';
import { testCasesData } from '../../assets/data/test-cases/test-cases.data';
import { createSignupUserAddressInfo, createSignupUserBasicInfo } from '../../factories/signup.factory';
import { urlTitleData } from '../../assets/data/e2e/url-title.data';
import { categoryProductsData } from '../../assets/data/e2e/category-products.data';
import { createContactUsForm } from '../../factories/contact-us.factory';
import { ProductDetailsModel } from '../../models/product-details.model';

test.describe('Test for test cases', () => {
  test.beforeEach(async ({ page, home }, testInfo) => {
    //Arrange
    console.log(`Running ${testInfo.title}`);

    //Act
    // await chromium.launch(); //* Commented because using all browsers for tests

    //* Advertisements blocker
    await page.route('**/*', (route) => {
      if (route.request().url().startsWith('https://googleads.')) {
        route.abort();
      } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
        route.abort();
      } else if (route.request().url().startsWith('https://pagead2.googlesyndication.com')) {
        route.abort();
      } else {
        route.continue();
      }
    });

    //* Another method
    // const locator = page.getByText('This site asks for consent to use your data');
    // await page.addLocatorHandler(
    //   locator,
    //   async (overlay) => {
    //     await overlay.getByRole('button', { name: 'Consent' }).click();
    //   },
    //   { times: 3, noWaitAfter: true },
    // );
    // // Run your tests that can be interrupted by the overlay.
    // // ...
    // await page.removeLocatorHandler(locator);

    await home.goTo();

    //Assert
    await home.expectHomePage();
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus) console.log(`Did not run as expected, ended up at ${page.url()}`);

    // await page.close();
  });

  test('😒 Test Case 1: Register User', async ({ header, login, signup, home }) => {
    //Arrange

    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();

    //Act
    await header.openSignupLoginPage();
    await expect(login.headerSignup).toBeVisible();
    //? steps 6- 13
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);

    // 6. Enter name and email address
    // 7. Click 'Signup' button
    // await login.fillUserSignup(userBaseData);
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    // await signup.expectAccountInformation(userBaseData);
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // await signup.fillBasicInformation(userBasicInfoData);
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // await signup.selectNewsletterAndOffers();
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // await signup.fillAddressInformation(userAddressInfoData);
    // 13. Click 'Create Account button'
    // await signup.clickCreateAccount();
    //? new page 'account_created'
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect.soft(signup.create.headerAccountCreated).toContainText('Account Created!');
    // 15. Click 'Continue' button
    await signup.create.clickContinue();

    // 16. Verify that 'Logged in as username' is visible
    await header.expectLoggedUser(userBaseData.name);
    // 17. Click 'Delete Account' button
    await header.clickDeleteAccount();
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();
    // 19. Verify that home page is visible successfully

    //Assert
    await home.expectHomePage();

    // Test Case 1: Register User
    const TC1: string = testCasesData.test_case_1;
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and email address
    // 7. Click 'Signup' button
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // 13. Click 'Create Account button'
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    // 15. Click 'Continue' button
    // 16. Verify that 'Logged in as username' is visible
    // 17. Click 'Delete Account' button
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    // 19. Verify that home page is visible successfully
  });

  test('😒 Test Case 2: Login User with correct data', async ({ header, login, request, signup, home }) => {
    //Arrange
    const userLoginData: UserLoginModel = {
      email: userData.fakeAPIemail,
      password: userData.fakePassword,
      username: userData.fakeAPIname,
    };

    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();

    //Act
    await header.openSignupLoginPage();
    await expect(login.headerLogin).toBeVisible();
    //? API
    const response = await request.post('api/createAccount', {
      headers: {
        Accept: '*/*',
        ContentType: 'application/json',
      },
      form: {
        name: userLoginData.username!,
        email: userLoginData.email,
        password: userLoginData.password,
        title: 'Mr',
        birth_date: userBasicInfoData.day,
        birth_month: userBasicInfoData.month,
        birth_year: userBasicInfoData.year,
        firstname: userAddressInfoData.firstName,
        lastname: userAddressInfoData.lastName,
        company: userAddressInfoData.company,
        address1: userAddressInfoData.address,
        address2: userAddressInfoData.address2,
        country: userAddressInfoData.country,
        zipcode: userAddressInfoData.zipCode,
        state: userAddressInfoData.state,
        city: userAddressInfoData.city,
        mobile_number: userAddressInfoData.phoneNumber,
      },
    });
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe('User created!');
    //? Login method
    await login.loginToAccount(userLoginData);
    //? END API

    await header.expectLoggedUser(userLoginData.username!);
    await header.clickDeleteAccount();
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    //Assert
    await home.expectHomePage();

    // Test Case 2: Login User with correct email and password
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'Login to your account' is visible
    // 6. Enter correct email address and password
    // 7. Click 'login' button
    // 8. Verify that 'Logged in as username' is visible
    // 9. Click 'Delete Account' button
    // 10. Verify that 'ACCOUNT DELETED!' is visible
    // 11. Verify that home page is visible successfully
  });

  test('✅ Test Case 3: Login User with incorrect data', async ({ header, login }) => {
    //Arrange
    const userLoginData: UserLoginModel = createFakeLoginUser();

    //Act
    await header.openSignupLoginPage();
    await login.loginToAccount(userLoginData);

    //Assert
    await expect.soft(login.paragraphLoginIncorrectData).toBeVisible();

    // Test Case 3: Login User with incorrect email and password
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'Login to your account' is visible
    // 6. Enter incorrect email address and password
    // 7. Click 'login' button
    // 8. Verify error 'Your email or password is incorrect!' is visible
  });

  test('😒 Test Case 4: Logout User', async ({ header, login }) => {
    //Arrange
    //TODO: Update userLoginData > .env
    const userLoginData: UserLoginModel = {
      email: userData.logoutEmail,
      password: userData.fakePassword,
      username: userData.logoutUser,
    };

    //Act
    await header.openSignupLoginPage();
    await expect.soft(login.headerLogin).toBeVisible();
    await login.loginToAccount(userLoginData);
    await header.expectLoggedUser(userLoginData.username!);
    await header.clickLogout();

    //Assert
    await login.expectLoginPage();

    // Test Case 4: Logout User
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'Login to your account' is visible
    // 6. Enter correct email address and password
    // 7. Click 'login' button
    // 8. Verify that 'Logged in as username' is visible
    // 9. Click 'Logout' button
    // 10. Verify that user is navigated to login page
  });

  test('😒 Test Case 5: Register User with existing email', async ({ header, login }) => {
    //Arrange
    //TODO: update userBaseData to fakerjs
    const userBaseData: UserSignupModel = {
      name: userData.logoutUser,
      email: userData.logoutEmail,
    };

    //Act
    await header.openSignupLoginPage();
    await expect.soft(login.headerSignup).toBeVisible();
    await login.fillUserSignup(userBaseData);

    //Assert
    await expect(login.paragraphSignupIncorrectData).toBeVisible();

    // Test Case 5: Register User with existing email
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and already registered email address
    // 7. Click 'Signup' button
    // 8. Verify error 'Email Address already exist!' is visible
  });

  test('✅ Test Case 6: Contact Us Form', async ({ header, contactUs, home }) => {
    //Arrange
    const contactUsFormData = createContactUsForm();

    //Act
    await header.openContactUsPage();
    await expect.soft(contactUs.header).toBeVisible();
    await contactUs.fillContactUs(contactUsFormData);

    await contactUs.catchDialog();
    await contactUs.buttonAcceptDialog.click();

    await expect.soft(contactUs.alertMessage).toContainText(contactUsData.alertSuccess);
    await contactUs.buttonBackHome.click();

    //Assert
    await home.expectHomePage();

    // Test Case 6: Contact Us Form
    // 1. Launch browser (//)
    // 2. Navigate to url 'await page.goto('https://automationexercise.com/');
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Contact Us' button
    // 5. Verify 'GET IN TOUCH' is visible
    // 6. Enter name, email, subject and message
    // 7. Upload file
    // 8. Click 'Submit' button
    // 9. Click OK button
    // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    // 11. Click 'Home' button and verify that landed to home page successfully
  });

  test('✅ Test Case 7: Verify Test Cases Page', async ({ slider, testCases }) => {
    //Act
    await slider.openTestCasesFromSlider();

    //Assert
    await testCases.expectTestCasePage();

    // Test Case 7: Verify Test Cases Page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Test Cases' button
    // 5. Verify user is navigated to test cases page successfully
  });

  test('😒 Test Case 8: Verify All Products and product detail page', async ({ header, products }) => {
    //Arrange
    const detailsData: ProductDetailsModel = {
      name: 'Blue Top',
      category: 'Women > Tops',
      price: '500',
      availability: 'In Stock',
      condition: 'New',
      brand: 'Polo',
    };
    //Act
    await header.openProductsPage();
    await products.expectProductsPage();

    // 7. Click on 'View Product' of first product
    await products.openFirstViewProduct();
    //Assert
    // 8. User is landed to product detail page
    await products.details.expectProductDetailsPage();
    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await products.details.expectProductDetails(detailsData);

    // Test Case 8: Verify All Products and product detail page
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Products' button
    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // 6. The products list is visible
    // 7. Click on 'View Product' of first product
    // 8. User is landed to product detail page
    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
  });

  test('✅ Test Case 9: Search Product', async ({ header, products }) => {
    //? some search words like "Top" will show products without the name "Top" in the product details.
    //? "Top" also shows results for "Tops".
    //Arrange
    const search: string = 'Blue';
    //Act
    await header.openProductsPage();
    await products.expectProductsPage();
    await products.searchProduct(search);

    //Assert
    await products.isFoundProductsHaveSearchText(search);

    // Test Case 9: Search Product
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Products' button
    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // 6. Enter product name in search input and click search button
    // 7. Verify 'SEARCHED PRODUCTS' is visible
    // 8. Verify all the products related to search are visible
  });

  test('✅ Test Case 10: Verify Subscription in home page', async ({ home }) => {
    //Arrange
    const emailData: UserLoginModel = createFakeLoginUser();

    //Act
    await home.scrollDownPage();
    await expect(home.footer.headerSubscription).toBeVisible();
    await home.footer.sendSubscribe(emailData.email);

    //Assert
    await expect(home.footer.alertSuccessSubs).toContainText(homeData.confirmationSubscribe);

    // Test Case 10: Verify Subscription in home page
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down to footer
    // 5. Verify text 'SUBSCRIPTION'
    // 6. Enter email address in input and click arrow button
    // 7. Verify success message 'You have been successfully subscribed!' is visible
  });

  test('✅ Test Case 11: Verify Subscription in Cart page', async ({ header, cart }) => {
    //Arrange
    const emailData: UserLoginModel = createFakeLoginUser();
    //Act
    await header.openCartPage();
    await cart.scrollDownPage();
    await expect(cart.footer.headerSubscription).toBeVisible();
    await cart.footer.sendSubscribe(emailData.email);

    //Assert
    await expect(cart.footer.alertSuccessSubs).toContainText(homeData.confirmationSubscribe);

    // Test Case 11: Verify Subscription in Cart page
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Cart' button
    // 5. Scroll down to footer
    // 6. Verify text 'SUBSCRIPTION'
    // 7. Enter email address in input and click arrow button
    // 8. Verify success message 'You have been successfully subscribed!' is visible
  });

  test('😒 Test Case 12: Add Products in Cart', async ({ header, products, cart }) => {
    //Arrange
    //TODO: update expectAddProducts()
    const productNumber = {
      first: 0,
      second: 1,
    };
    //Act
    await header.openProductsPage();
    await products.addProductNumberAndContinue(productNumber.first);
    await products.addProductNumberAndViewCart(productNumber.second);
    //Assert
    const rowCount = await cart.rowForProduct.count();
    expect(rowCount).toBe(2);
    await cart.expectAddProducts();

    // Test Case 12: Add Products in Cart
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Products' button
    // 5. Hover over first product and click 'Add to cart'
    // 6. Click 'Continue Shopping' button
    // 7. Hover over second product and click 'Add to cart'
    // 8. Click 'View Cart' button
    // 9. Verify both products are added to Cart
    // 10. Verify their prices, quantity and total price
  });

  test('Test Case 13: Verify Product quantity in Cart @smoke', async ({ products }) => {
    //Arrange
    const quantity = productData.productQuantity;
    //Act
    await products.openFirstViewProduct();
    await products.details.expectProductDetailsPage();
    await products.addProductQuantity(quantity);
    //Assert
    await products.expectAddProductQuantity();

    // Test Case 13: Verify Product quantity in Cart
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'View Product' for any product on home page
    // 5. Verify product detail is opened
    // 6. Increase quantity to 4
    // 7. Click 'Add to cart' button
    // 8. Click 'View Cart' button
    // 9. Verify that product is displayed in cart page with exact quantity
  });

  test('Test Case 14: Place Order: Register while Checkout', async ({ header, products, home, cart, user, signup }) => {
    //TODO:
    //! NOW
    //Arrange

    const quantity = productData.productQuantity;

    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    // const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();

    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    // const userBasicInfoData: UserSignupBasicInfoModel = {
    //   password: faker.internet.password(),
    //   day: faker.number.int({ min: 1, max: 31 }).toString(),
    //   month: faker.date.month(),
    //   year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    // };
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    // const userAddressInfoData: UserSignupAddressInfoModel = {
    //   firstName: faker.person.firstName(),
    //   lastName: faker.person.lastName(),
    //   company: faker.company.name(),
    //   address: faker.location.streetAddress({ useFullAddress: true }),
    //   address2: faker.location.secondaryAddress(),
    //   country: userData.country,
    //   state: faker.location.state(),
    //   city: faker.location.city(),
    //   zipCode: faker.location.zipCode(),
    //   phoneNumber: faker.phone.number(),
    // };

    await header.expectLoggedUser(username);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
      ${yourDeliveryAddress}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state}
      ${zipCode}
      ${userAddressInfoData.country}
      ${phoneNumber}`;

    const deliveryInvoice = `
      ${yourDeliveryInvoice}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state} 
      ${zipCode} 
      ${userAddressInfoData.country} 
      ${phoneNumber}`;

    const description = faker.lorem.text();
    const cardNumber = faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }); // '4480-0500-0000-0000;
    const cvc = faker.finance.creditCardCVV();
    const expiryMonth = cartData.expiryMonth;
    const expiryYear = cartData.expiryYear;

    //Act
    await products.openFirstViewProduct();
    await products.details.expectProductDetailsPage();
    await products.addProductQuantity(quantity);
    await cart.expectCartPage();
    await cart.checkoutFromCartPage();

    //? openSignup from checkout?
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);

    await header.expectLoggedUser(username);

    await header.openCartPage();
    await cart.expectCartPage();

    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);

    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    // await user.deleteUser();
    await header.clickDeleteAccount();
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 14: Place Order: Register while Checkout
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click Proceed To Checkout
    // 8. Click 'Register / Login' button
    // 9. Fill all details in Signup and create account
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 11. Verify ' Logged in as username' at top
    // 12.Click 'Cart' button
    // 13. Click 'Proceed To Checkout' button
    // 14. Verify Address Details and Review Your Order
    // 15. Enter description in comment text area and click 'Place Order'
    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 17. Click 'Pay and Confirm Order' button
    // 18. Verify success message 'Your order has been placed successfully!'
    // 19. Click 'Delete Account' button
    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 15: Place Order: Register before Checkout', async ({ page, header, home, user, products, cart, signup }) => {
    //TODO:
    //! NOW
    //Arrange

    const quantity = productData.productQuantity;

    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    // const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();

    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    // const userBasicInfoData: UserSignupBasicInfoModel = {
    //   password: faker.internet.password(),
    //   day: faker.number.int({ min: 1, max: 31 }).toString(),
    //   month: faker.date.month(),
    //   year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    // };
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    // const userAddressInfoData: UserSignupAddressInfoModel = {
    //   firstName: faker.person.firstName(),
    //   lastName: faker.person.lastName(),
    //   company: faker.company.name(),
    //   address: faker.location.streetAddress({ useFullAddress: true }),
    //   address2: faker.location.secondaryAddress(),
    //   country: userData.country,
    //   state: faker.location.state(),
    //   city: faker.location.city(),
    //   zipCode: faker.location.zipCode(),
    //   phoneNumber: faker.phone.number(),
    // };

    // const loggedUser = page.getByText(`${homeData.loggedInAs} ${username}`);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
      ${yourDeliveryAddress}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state}
      ${zipCode}
      ${userAddressInfoData.country}
      ${phoneNumber}`;

    const deliveryInvoice = `
      ${yourDeliveryInvoice}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state} 
      ${zipCode} 
      ${userAddressInfoData.country} 
      ${phoneNumber}`;

    const description = faker.lorem.text();
    const cardNumber = faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }); // '4480-0500-0000-0000;
    const cvc = faker.finance.creditCardCVV();
    const expiryMonth = cartData.expiryMonth;
    const expiryYear = cartData.expiryYear;

    //Act
    await header.openSignupLoginPage();
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);

    // await expect(loggedUser).toBeVisible();
    await header.expectLoggedUser(username);

    await products.openFirstViewProduct();
    await products.details.expectProductDetailsPage();
    await products.addProductQuantity(quantity);
    await cart.expectCartPage();
    await cart.buttonProceedToCheckout.click();
    await header.openCartPage();
    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    // await user.deleteUser();
    await header.clickDeleteAccount();
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 15: Place Order: Register before Checkout
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Signup / Login' button
    // 5. Fill all details in Signup and create account
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 7. Verify ' Logged in as username' at top
    // 8. Add products to cart
    // 9. Click 'Cart' button
    // 10. Verify that cart page is displayed
    // 11. Click Proceed To Checkout
    // 12. Verify Address Details and Review Your Order
    // 13. Enter description in comment text area and click 'Place Order'
    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 15. Click 'Pay and Confirm Order' button
    // 16. Verify success message 'Your order has been placed successfully!'
    // 17. Click 'Delete Account' button
    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 16: Place Order: Login before Checkout', async ({ page, header, login, home, user, products, cart, signup }) => {
    //TODO:
    //! NOW
    //Arrange
    const userLoginData: UserLoginModel = {
      email: userData.fakeExistEmail,
      password: userData.fakePassword,
    };

    const quantity = productData.productQuantity;

    const username = userData.fakeExistUsername;
    const email = userData.fakeExistEmail;
    const password = userData.fakePassword;
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    // const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();

    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    // const userBasicInfoData: UserSignupBasicInfoModel = {
    //   password: faker.internet.password(),
    //   day: faker.number.int({ min: 1, max: 31 }).toString(),
    //   month: faker.date.month(),
    //   year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    // };
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    // const userAddressInfoData: UserSignupAddressInfoModel = {
    //   firstName: faker.person.firstName(),
    //   lastName: faker.person.lastName(),
    //   company: faker.company.name(),
    //   address: faker.location.streetAddress({ useFullAddress: true }),
    //   address2: faker.location.secondaryAddress(),
    //   country: userData.country,
    //   state: faker.location.state(),
    //   city: faker.location.city(),
    //   zipCode: faker.location.zipCode(),
    //   phoneNumber: faker.phone.number(),
    // };

    // const loggedUser = page.getByText(`${homeData.loggedInAs} ${username}`);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
      ${yourDeliveryAddress}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state}
      ${zipCode}
      ${userAddressInfoData.country}
      ${phoneNumber}`;

    const deliveryInvoice = `
      ${yourDeliveryInvoice}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state} 
      ${zipCode} 
      ${userAddressInfoData.country} 
      ${phoneNumber}`;

    const description = faker.lorem.text();
    const cardNumber = faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }); // '4480-0500-0000-0000;
    const cvc = faker.finance.creditCardCVV();
    const expiryMonth = cartData.expiryMonth;
    const expiryYear = cartData.expiryYear;

    //Act
    await header.openSignupLoginPage();
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);

    // await expect(loggedUser).toBeVisible();
    await header.expectLoggedUser(username);
    await header.clickLogout();
    await header.openSignupLoginPage();
    await login.loginToAccount(userLoginData);
    // await expect(loggedUser).toBeVisible();
    await header.expectLoggedUser(username);

    await products.openFirstViewProduct();
    await products.details.expectProductDetailsPage();
    await products.addProductQuantity(quantity);
    await cart.expectCartPage();
    await cart.buttonProceedToCheckout.click();
    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    // await user.deleteUser();
    await header.clickDeleteAccount();
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 16: Place Order: Login before Checkout
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Signup / Login' button (used method to create new account before login)
    // 5. Fill email, password and click 'Login' button
    // 6. Verify 'Logged in as username' at top
    // 7. Add products to cart
    // 8. Click 'Cart' button
    // 9. Verify that cart page is displayed
    // 10. Click Proceed To Checkout
    // 11. Verify Address Details and Review Your Order
    // 12. Enter description in comment text area and click 'Place Order'
    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 14. Click 'Pay and Confirm Order' button
    // 15. Verify success message 'Your order has been placed successfully!'
    // 16. Click 'Delete Account' button
    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 17: Remove Products From Cart', async ({ products, cart }) => {
    //Arrange
    const quantity = productData.productQuantity;

    //Act
    await products.openFirstViewProduct();
    await products.details.expectProductDetailsPage();
    await products.addProductQuantity(quantity);
    await cart.expectCartPage();
    await cart.buttonDeleteQuantity.click();

    //Assert
    await expect(cart.divCartEmpty).toBeVisible();

    // Test Case 17: Remove Products From Cart
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click 'X' button corresponding to particular product
    // 8. Verify that product is removed from the cart
  });

  test('Test Case 18: View Category Products', async ({ home }) => {
    //Arrange
    const womenProductData = {
      category: 'Women',
      products: 'Dress',
      header: categoryProductsData.hWomenDressProducts,
      url: urlTitleData.urlWomenDress,
      title: urlTitleData.productWomenDress,
    };

    const menProductData = {
      category: 'Men',
      products: 'Jeans',
      header: categoryProductsData.hMenJeansProducts,
      url: urlTitleData.urlMenJeans,
      title: urlTitleData.productMenJeans,
    };

    //Act
    await home.leftSidebar.expectLeftSidebar();

    await home.leftSidebar.openCategoryByName(womenProductData.category);
    await home.leftSidebar.openCategoryProductsByName(womenProductData.products);

    await home.categoryProducts.expectCategoryProductsPage(womenProductData.url, womenProductData.title);
    await expect(home.categoryProducts.getHeaderName(womenProductData.header)).toBeVisible();

    await home.leftSidebar.openCategoryByName(menProductData.category);
    await home.leftSidebar.openCategoryProductsByName(menProductData.products);

    await home.categoryProducts.expectCategoryProductsPage(menProductData.url, menProductData.title);
    //Assert
    await expect(home.categoryProducts.getHeaderName(menProductData.header)).toBeVisible();

    // Test Case 18: View Category Products
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that categories are visible on left side bar
    // 4. Click on 'Women' category
    // 5. Click on any category link under 'Women' category, for example: Dress
    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    // 7. On left side bar, click on any sub-category link of 'Men' category
    // 8. Verify that user is navigated to that category page
  });

  test('Test Case 19: View & Cart Brand Products @smoke', async ({ header, home, products }) => {
    //TODO:
    //Arrange

    //Act
    await header.openProductsPage();
    await products.leftSidebar.expectLeftSidebar();
    await home.openBrandMastHarbour();

    //Assert
    await home.openBrandPolo();

    // Test Case 19: View & Cart Brand Products
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify that Brands are visible on left side bar
    // 5. Click on any brand name
    // 6. Verify that user is navigated to brand page and brand products are displayed
    // 7. On left side bar, click on any other brand link
    // 8. Verify that user is navigated to that brand page and can see products
  });

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ header, login, page, products, home, user }) => {
    //Arrange
    test.slow();
    // test.setTimeout(120000);

    const search: string = 'Top';
    const expectProductNumber = Number(14);

    const userLoginData: UserLoginModel = {
      email: userData.logoutEmail,
      password: userData.fakePassword,
    };

    const email = userData.logoutEmail; //'fake@email.cc',
    const password = userData.fakePassword; //'fake!Password00',

    //Act
    await header.openProductsPage();
    await products.expectProductsPage();
    await products.searchProduct(search);
    const searchResults = await page.locator('div.single-products').count();
    await expect(searchResults).toBe(expectProductNumber);
    console.log('Results on page: ', searchResults);

    //* Catching by $$ selector
    const addToCarts = await page.$$('div.productinfo.text-center > a.btn.btn-default.add-to-cart');

    for (const addToCart of addToCarts) {
      await addToCart.click();
      await products.bContinueShopping.click();
    }
    //* -----------------------------

    //* Catching by text and method .all()
    // for (const addToCart of await page.locator('.productinfo.text-center').getByText('Add to cart').all()) {
    //   await addToCart.click();
    //   await products.bContinueShopping.click();
    // }
    //* -----------------------------

    //* Catching by text and method .count()
    // const addToCart = page.locator('.productinfo.text-center').getByText('Add to cart');
    //
    // for (let i = 0; i < (await addToCart.count()); i++) {
    //   await addToCart.nth(i).click();
    //   await products.bContinueShopping.click();
    // }
    //* -----------------------------

    await header.openCartPage();

    const cartProductNumber = await page.locator('#cart_info_table').locator('tbody > tr').count();
    Number(cartProductNumber) == Number(searchResults);
    console.log('Are the values is correct: ', cartProductNumber === searchResults);

    await header.openSignupLoginPage();
    await login.loginToAccount(userLoginData);

    await header.openCartPage();
    const cartProductNumberAfterLogin = await page.locator('#cart_info_table').locator('tbody > tr').count();
    //Assert
    Number(cartProductNumberAfterLogin) == Number(searchResults);
    console.log('Are the values is correct: ', cartProductNumberAfterLogin === searchResults);

    // Test Case 20: Search Products and Verify Cart After Login
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    // 5. Enter product name in search input and click search button
    // 6. Verify 'SEARCHED PRODUCTS' is visible
    // 7. Verify all the products related to search are visible
    // 8. Add those products to cart
    // 9. Click 'Cart' button and verify that products are visible in cart
    // 10. Click 'Signup / Login' button and submit login details
    // 11. Again, go to Cart page
    // 12. Verify that those products are visible in cart after login as well
  });

  test('Test Case 21: Add review on product', async ({ header, products }) => {
    //Arrange
    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const review = faker.lorem.text();

    //Act
    await header.openProductsPage();
    await products.expectProductsPage();
    await products.addProductReview(username, email, review);

    //Assert
    await products.expectSuccessReviewMessage();

    // Test Case 21: Add review on product
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    // 5. Click on 'View Product' button
    // 6. Verify 'Write Your Review' is visible
    // 7. Enter name, email and review
    // 8. Click 'Submit' button
    // 9. Verify success message 'Thank you for your review.'
  });

  test('Test Case 22: Add to cart from Recommended items', async ({ home, cart }) => {
    //Arrange

    //Act
    await home.scrollDownPage();
    await expect.soft(home.headerRecommendedItems).toBeVisible();
    await home.addFromRecommendedItemsAndViewCart();

    //Assert
    await expect(cart.rowForProduct).toBeVisible();

    // Test Case 22: Add to cart from Recommended items
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Scroll to bottom of page
    // 4. Verify 'RECOMMENDED ITEMS' are visible
    // 5. Click on 'Add To Cart' on Recommended product
    // 6. Click on 'View Cart' button
    // 7. Verify that product is displayed in cart page
  });

  test('Test Case 23: Verify address details in checkout page', async ({ header, page, home, user, products, cart, signup }) => {
    //TODO:
    //! NOW
    //Arrange
    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    // const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();

    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    // const userBasicInfoData: UserSignupBasicInfoModel = {
    //   password: faker.internet.password(),
    //   day: faker.number.int({ min: 1, max: 31 }).toString(),
    //   month: faker.date.month(),
    //   year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    // };
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    // const userAddressInfoData: UserSignupAddressInfoModel = {
    //   firstName: faker.person.firstName(),
    //   lastName: faker.person.lastName(),
    //   company: faker.company.name(),
    //   address: faker.location.streetAddress({ useFullAddress: true }),
    //   address2: faker.location.secondaryAddress(),
    //   country: userData.country,
    //   state: faker.location.state(),
    //   city: faker.location.city(),
    //   zipCode: faker.location.zipCode(),
    //   phoneNumber: faker.phone.number(),
    // };

    // const loggedUser = page.getByText(`${homeData.loggedInAs} ${username}`);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
      ${yourDeliveryAddress}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state}
      ${zipCode}
      ${userAddressInfoData.country}
      ${phoneNumber}`;

    const deliveryInvoice = `
      ${yourDeliveryInvoice}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state} 
      ${zipCode} 
      ${userAddressInfoData.country} 
      ${phoneNumber}`;

    // Act
    await header.openSignupLoginPage();
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);

    // await expect(loggedUser).toBeVisible();
    await header.expectLoggedUser(username);

    await products.bAddToCart.first().click();
    await products.bContinueShopping.click();

    await cart.proceedToCheckoutWithAddressVerification(deliveryAddress, deliveryInvoice);

    //Assert
    // await user.deleteUser();
    await header.clickDeleteAccount();
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 23: Verify address details in checkout page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Signup / Login' button
    // 5. Fill all details in Signup and create account
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 7. Verify ' Logged in as username' at top
    // 8. Add products to cart
    // 9. Click 'Cart' button
    // 10. Verify that cart page is displayed
    // 11. Click Proceed To Checkout
    // 12. Verify that the delivery address is same address filled at the time registration of account
    // 13. Verify that the billing address is same address filled at the time registration of account
    // 14. Click 'Delete Account' button
    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 24: Download Invoice after purchase order', async ({ page, products, cart, user, header, signup }) => {
    //TODO:
    //! NOW
    //Arrange
    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    // const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();

    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    // const userBasicInfoData: UserSignupBasicInfoModel = {
    //   password: faker.internet.password(),
    //   day: faker.number.int({ min: 1, max: 31 }).toString(),
    //   month: faker.date.month(),
    //   year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    // };
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    // const userAddressInfoData: UserSignupAddressInfoModel = {
    //   firstName: faker.person.firstName(),
    //   lastName: faker.person.lastName(),
    //   company: faker.company.name(),
    //   address: faker.location.streetAddress({ useFullAddress: true }),
    //   address2: faker.location.secondaryAddress(),
    //   country: userData.country,
    //   state: faker.location.state(),
    //   city: faker.location.city(),
    //   zipCode: faker.location.zipCode(),
    //   phoneNumber: faker.phone.number(),
    // };

    // const loggedUser = page.getByText(`${homeData.loggedInAs} ${username}`);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
      ${yourDeliveryAddress}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state}
      ${zipCode}
      ${userAddressInfoData.country}
      ${phoneNumber}`;

    const deliveryInvoice = `
      ${yourDeliveryInvoice}
      Mrs. ${firstName} ${lastName}
      ${company}
      ${address1}
      ${address2}
      ${city} ${state} 
      ${zipCode} 
      ${userAddressInfoData.country} 
      ${phoneNumber}`;

    const description = faker.lorem.text();
    const cardNumber = faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }); // '4480-0500-0000-0000;
    const cvc = faker.finance.creditCardCVV();
    const expiryMonth = cartData.expiryMonth;
    const expiryYear = cartData.expiryYear;

    // Act
    await products.addProductGoCartPage();
    await cart.buttonProceedToCheckout.click();
    await cart.buttonRegisterLogin.click();

    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);

    await header.expectLoggedUser(username);

    await cart.checkoutWithoutExpectProductQuantity(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);
    //* Download method
    const downloadPromise = page.waitForEvent('download');
    await cart.buttonDownloadInvoice.click();
    const download = await downloadPromise;
    if (download) {
      console.log('File downloaded successfully.');
      await download.saveAs('./test-download/e2e/cart/Invoice.txt');
    } else {
      console.log('File download failed.');
    }
    //*--------------

    await cart.buttonContinue.click();

    //Assert
    // await user.deleteUser();
    await header.clickDeleteAccount();
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 24: Download Invoice after purchase order
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click Proceed To Checkout
    // 8. Click 'Register / Login' button
    // 9. Fill all details in Signup and create account
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 11. Verify ' Logged in as username' at top
    // 12. Click 'Cart' button
    // 13. Click 'Proceed To Checkout' button
    // 14. Verify Address Details and Review Your Order
    // 15. Enter description in comment text area and click 'Place Order'
    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 17. Click 'Pay and Confirm Order' button
    // 18. Verify success message 'Your order has been placed successfully!'
    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
    // 20. Click 'Continue' button
    // 21. Click 'Delete Account' button
    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality @smoke', async ({ home }) => {
    //Assert
    //Act
    await home.scrollUpConfirmByScreen();

    //Assert
    //* Check files in ./test-download/e2e/home/
    // first assertion: hSubscription.png
    // second assertion: hAutomationExercise.png

    // Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Click on arrow at bottom right side to move upward
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });

  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality @smoke', async ({ home }) => {
    //Assert
    //Act
    await home.noScrollUpConfirmByScreen();

    //Assert
    //* Check files in ./test-download/e2e/home/
    // first assertion: noScrollUpHSubscription.png
    // second assertion: noScrollUpHAutomationExercise.png

    // Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Scroll up page to top
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });
});
