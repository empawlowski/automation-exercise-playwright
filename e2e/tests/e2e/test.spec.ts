import * as data from '@_e2e/assets/data/e2e/app.data.json';
import { createAccountApi } from '@_e2e/factories/api/authentication/create-account.factory';
import { randomDesc } from '@_e2e/factories/checkout.factory';
import { createContactUsForm } from '@_e2e/factories/contact-us.factory';
import { createFakeLoginUser, createSignupUser } from '@_e2e/factories/login.factory';
import { createCardInfoForm } from '@_e2e/factories/payment.factory';
import { createProductReview } from '@_e2e/factories/product-details.factory';
import { createSignupUserAddressInfo, createSignupUserBasicInfo } from '@_e2e/factories/signup.factory';
import { expect, test } from '@_e2e/fixtures/base.fixture';
import { logger } from '@_e2e/helpers/logger.helper';
import { CreateAccountApiModel, CreateAccountBodyApiModel } from '@_e2e/models/api/authentication/create-account.model';
import { CartProductModel } from '@_e2e/models/e2e/cart.model';
import { CheckoutDescModel } from '@_e2e/models/e2e/checkout.model';
import { ContactUsModel } from '@_e2e/models/e2e/contact-us.model';
import { UserLoginModel, UserSignupModel } from '@_e2e/models/e2e/login.model';
import { CardInfoModel } from '@_e2e/models/e2e/payment.model';
import { ProductDetailsModel, ProductReviewModel } from '@_e2e/models/e2e/product-details.model';
import { UserSignupAddressInfoModel, UserSignupBasicInfoModel } from '@_e2e/models/e2e/signup.model';

test.describe('Test for test cases', { tag: ['@reg'] }, () => {
  test.beforeEach(async ({ home }, testInfo) => {
    //Arrange
    logger.info(`Running ${testInfo.title}`);

    //Act
    //* Advertisements blocker
    // await page.route('**/*', (route) => {
    //   if (route.request().url().startsWith('https://googleads.')) {
    //     route.abort();
    //   } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
    //     route.abort();
    //   } else if (route.request().url().startsWith('https://pagead2.googlesyndication.com')) {
    //     route.abort();
    //   } else {
    //     route.continue();
    //   }
    // });

    //* Another method
    await home.catchHandler();

    await home.goTo();

    //Assert
    await home.expectHomePage();
  });

  test.afterEach(async ({ page }, testInfo) => {
    logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus) logger.info(`Did not run as expected, ended up at ${page.url()}`);

    await page.close();
  });

  test('Case 1: Register User', { tag: ['@smoke'] }, async ({ header, login, signup, home }) => {
    //Arrange
    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();

    //Act
    await test.step('Part 4: Open Signup/Login page', async () => {
      await header.openSignupLoginPage();
    });
    await test.step('Part 5: Verify "New User Signup!" is visible', async () => {
      await expect(login.headerSignup).toBeVisible();
    });
    await test.step('Part 6-13: Create new user', async () => {
      await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);
    });
    await test.step('Part 14: Verify that "ACCOUNT CREATED!" is visible', async () => {
      await expect.soft(signup.create.headerAccountCreated).toContainText('Account Created!');
    });
    await test.step('Part 15: Click "Continue" button', async () => {
      await signup.create.clickContinue();
    });
    await test.step('Part 16: Verify that "Logged in as username" is visible', async () => {
      await home.expectHomePage();
      await header.expectLoggedUser(userBaseData.name);
    });
    await test.step('Part 17: Click "Delete Account" button', async () => {
      await header.clickDeleteAccount();
      await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    });
    await test.step('Part 18: Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
      await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
      await signup.delete.clickContinue();
    });
    //Assert
    await test.step('Part 19: Verify that home page is visible successfully', async () => {
      await home.expectHomePage();
    });

    // Test Case 1: Register User
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

  test('Case 2: Login User with correct data', async ({ header, login, apiRequest, apiResponse, signup, home }) => {
    //Arrange
    const apiUrl: string = '/api/createAccount';
    const createAccountApiData: CreateAccountApiModel = createAccountApi();

    //Act
    await header.openSignupLoginPage();
    await expect(login.headerLogin).toBeVisible();

    const response = await apiRequest.createAccount(apiUrl, createAccountApiData);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody: CreateAccountBodyApiModel = await response.json();
    logger.info(responseBody);
    apiResponse.checkResponseCode(responseBody, 201);
    apiResponse.checkResponseMessage(responseBody, 'User created!');

    await login.loginToAccount(createAccountApiData);
    await header.expectLoggedUser(createAccountApiData.name);
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

  test('Case 3: Login User with incorrect data', { tag: ['@smoke'] }, async ({ header, login }) => {
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

  test('Case 4: Logout User', async ({ header, login }) => {
    //Arrange
    const userLoginData: UserLoginModel = {
      email: process.env.USER_EMAIL as string,
      password: process.env.USER_PASSWORD as string,
      username: process.env.USER as string,
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

  test('Case 5: Register User with existing email', async ({ header, login }) => {
    //Arrange
    const userBaseData: UserSignupModel = {
      name: process.env.USER as string,
      email: process.env.USER_EMAIL as string,
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

  test('Case 6: Contact Us Form', async ({ header, contactUs, home }) => {
    //Arrange
    const contactUsFormData: ContactUsModel = createContactUsForm();

    //Act
    await header.openContactUsPage();
    await expect.soft(contactUs.header).toBeVisible();
    await contactUs.fillContactUs(contactUsFormData);

    await contactUs.catchDialog();
    await contactUs.buttonAcceptDialog.click();

    await expect.soft(contactUs.alertMessage).toContainText(data.contactUs.alertSuccess);
    await contactUs.buttonBackHome.click();

    //Assert
    await home.expectHomePage();

    // Test Case 6: Contact Us Form
    // 1. Launch browser
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

  test('Case 7: Verify Test Cases Page', async ({ slider, testCases }) => {
    //Act
    await slider.openTestCasesFromSlider();

    //Assert
    await testCases.expectTestCasePage();

    // Test Case 7: Verify Test Cases Page
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Test Cases' button
    // 5. Verify user is navigated to test cases page successfully
  });

  test('Case 8: Verify All Products and product detail page', async ({ header, products }) => {
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

    await test.step('Part 7: Click on "View Product" of first product', async () => {
      await products.openFirstViewProduct();
    });
    //Assert
    await test.step('Part 8: Verify that detail detail is visible', async () => {
      await products.details.expectProductDetailsPage();
    });
    await test.step('Part 9: Verify product details', async () => {
      await products.details.expectProductDetails(detailsData);
    });

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

  test('Case 9: Search Product', async ({ header, products }) => {
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

  test('Case 10: Verify Subscription in home page', async ({ home }) => {
    //Arrange
    const emailData: UserLoginModel = createFakeLoginUser();

    //Act
    await home.scrollDownPage();
    await expect(home.footer.headerSubscription).toBeVisible();
    await home.footer.sendSubscribe(emailData.email);

    //Assert
    await expect(home.footer.alertSuccessSubs).toContainText(data.footer.confirmationSubscribe);

    // Test Case 10: Verify Subscription in home page
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down to footer
    // 5. Verify text 'SUBSCRIPTION'
    // 6. Enter email address in input and click arrow button
    // 7. Verify success message 'You have been successfully subscribed!' is visible
  });

  test('Case 11: Verify Subscription in Cart page', async ({ header, cart, footer }) => {
    //Arrange
    const emailData: UserLoginModel = createFakeLoginUser();
    //Act
    await header.openCartPage();
    await cart.expectCartPage();
    await cart.scrollDownPage();
    await expect(footer.headerSubscription).toBeVisible();
    await footer.sendSubscribe(emailData.email);

    //Assert
    await expect(footer.alertSuccessSubs).toContainText(data.footer.confirmationSubscribe);

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

  test('Case 12: Add Products in Cart', async ({ header, products, cart }) => {
    //Arrange
    const productsData: CartProductModel[] = [
      {
        id: 0,
        name: 'Blue Top',
        price: 500,
        quantity: '1',
      },
      {
        id: 2,
        name: 'Sleeveless Dress',
        price: 1000,
        quantity: '1',
      },
    ];

    //Act
    await header.openProductsPage();
    await products.addProductNumberAndContinue(productsData[0].id!);
    await products.addProductNumberAndViewCart(productsData[1].id!);
    const rows = await cart.rowForProduct.count();
    expect(rows).toBe(2);

    //Assert
    await cart.expectAddedProducts(productsData);

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

  test('Case 13: Verify Product quantity in Cart', { tag: ['@smoke'] }, async ({ products, cart }) => {
    //Arrange
    const productData: CartProductModel = {
      name: 'Blue Top',
      quantity: '4',
    };
    //Act
    await products.openFirstViewProduct();
    await products.details.expectProductDetailsPage();
    await products.details.addProductQuantity(productData.quantity);
    await products.details.clickAddToCart();
    await products.details.clickViewCart();
    //Assert
    await cart.expectAddedProductAndQuantity(productData);

    // Test Case 13: Verify Product quantity in Cart
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'View Product' for any product on home page
    // 5. Verify product detail is opened
    // 6. Increase quantity to 4
    // 7. Click 'Add to cart' button
    // 8. Click 'View Cart' button
    // 9. Verify that product is displayed in cart page with exact quantity
  });

  test('Case 14: Place Order: Register while Checkout', async ({ header, home, cart, signup, checkout, payment }) => {
    test.slow();
    //Arrange
    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    const description: CheckoutDescModel = randomDesc();
    const cardData: CardInfoModel = createCardInfoForm();

    //Act
    await test.step('Part 4: Add products to cart', async () => {
      await home.products.addProductNumberAndContinue(0);
    });
    await test.step('Part 5: Click "Cart" button', async () => {
      await header.openCartPage();
    });
    await test.step('Part 6: Verify that cart page is displayed', async () => {
      await cart.expectCartPage();
    });
    await test.step('Part 7: Click Proceed To Checkout', async () => {
      await cart.clickProceedToCheckout();
    });
    await test.step('Part 8: Click "Register / Login" button', async () => {
      await cart.clickRegisterLogin();
    });
    await test.step('Part 9: Fill all details in Signup and create account', async () => {
      await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);
    });
    await test.step('Part 10: Verify "ACCOUNT CREATED!" and click "Continue" button', async () => {
      await expect(signup.create.headerAccountCreated).toContainText('Account Created!');
      await signup.create.clickContinue();
    });
    await test.step('Part 11: Verify "Logged in as username" at top', async () => {
      await home.expectHomePage();
      await header.expectLoggedUser(userBaseData.name);
    });
    await test.step('Part 12: Click "Cart" button', async () => {
      await header.openCartPage();
    });
    await test.step('Part 13: Click "Proceed To Checkout" button', async () => {
      await cart.clickProceedToCheckout();
    });
    await test.step('Part 14: Verify Address Details and Review Your Order', async () => {
      await checkout.checkDeliveryAddress(userAddressInfoData);
      await checkout.checkDeliveryInvoice(userAddressInfoData);
    });
    await test.step('Part 15: Enter description in comment text area and click "Place Order"', async () => {
      await checkout.fillDescription(description);
      await checkout.clickPlaceOrder();
    });
    await test.step('Part 16: Enter payment details', async () => {
      await payment.fillCardInformation(cardData);
    });
    await test.step('Part 17-18: Click "Pay and Confirm Order" button and Verify success message "Your order has been placed successfully!"', async () => {
      await payment.clickPayAndConfirm();
    });
    await test.step('Part 19: Click "Delete Account" button', async () => {
      await header.clickDeleteAccount();
    });
    //Assert
    await test.step('Part 20: Verify "ACCOUNT DELETED!" and click "Continue" button', async () => {
      await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
      await signup.delete.clickContinue();
    });

    // Test Case 14: Place Order: Register while Checkout
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click Proceed To Checkout
    // 8. Click 'Register / Login' button
    // 9. Fill all details in Signup and create account
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 11. Verify 'Logged in as username' at top
    // 12. Click 'Cart' button
    // 13. Click 'Proceed To Checkout' button
    // 14. Verify Address Details and Review Your Order
    // 15. Enter description in comment text area and click 'Place Order'
    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 17. Click 'Pay and Confirm Order' button
    // 18. Verify success message 'Your order has been placed successfully!'
    // 19. Click 'Delete Account' button
    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Case 15: Place Order: Register before Checkout', async ({ header, signup, home, cart, checkout, payment }) => {
    //Arrange
    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    const productListNumber: number = 0;
    const description: CheckoutDescModel = randomDesc();
    const cardData: CardInfoModel = createCardInfoForm();

    //Act
    await header.openSignupLoginPage();
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);
    await expect(signup.create.headerAccountCreated).toContainText('Account Created!');
    await signup.create.clickContinue();
    await header.expectLoggedUser(userBaseData.name);

    await home.products.addProductNumberAndContinue(productListNumber);
    // 9. Click 'Cart' button
    await header.openCartPage();
    // 10. Verify that cart page is displayed
    await cart.expectCartPage();
    // 11. Click Proceed To Checkout
    await cart.clickProceedToCheckout();
    // 12. Verify Address Details and Review Your Order
    await checkout.checkDeliveryAddress(userAddressInfoData);
    await checkout.checkDeliveryInvoice(userAddressInfoData);
    // 13. Enter description in comment text area and click 'Place Order'
    await checkout.fillDescription(description);
    await checkout.clickPlaceOrder();
    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await payment.fillCardInformation(cardData);
    // 15. Click 'Pay and Confirm Order' button
    await payment.clickPayAndConfirm();
    // 16. Verify success message 'Your order has been placed successfully!'
    // 17. Click 'Delete Account' button
    await header.clickDeleteAccount();
    //Assert
    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 15: Place Order: Register before Checkout
    // 1. Launch browser
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

  test('Case 16: Place Order: Login before Checkout', async ({ header, signup, home, cart, checkout, payment }) => {
    // Arrange
    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    const productsData = {
      listProductA: 0,
      listProductB: 1,
    };
    const description: CheckoutDescModel = randomDesc();
    const cardData: CardInfoModel = createCardInfoForm();

    // Act
    // 4. Click 'Signup / Login' button
    await header.openSignupLoginPage();
    // 5. Fill email, password and click 'Login' button
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);
    await signup.create.clickContinue();
    // 6. Verify 'Logged in as username' at top
    await header.expectLoggedUser(userBaseData.name);
    // 7. Add products to cart
    await home.products.addProductNumberAndContinue(productsData.listProductA);
    await home.products.addProductNumberAndContinue(productsData.listProductB);
    // 8. Click 'Cart' button
    await header.openCartPage();
    // 9. Verify that cart page is displayed
    await cart.expectCartPage();
    // 10. Click Proceed To Checkout
    await cart.clickProceedToCheckout();
    // 11. Verify Address Details and Review Your Order
    await checkout.checkDeliveryAddress(userAddressInfoData);
    await checkout.checkDeliveryInvoice(userAddressInfoData);
    // 12. Enter description in comment text area and click 'Place Order'
    await checkout.fillDescription(description);
    await checkout.clickPlaceOrder();
    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await payment.fillCardInformation(cardData);
    // 14. Click 'Pay and Confirm Order' button
    await payment.clickPayAndConfirm();
    // 15. Verify success message 'Your order has been placed successfully!'
    // Assert
    // 16. Click 'Delete Account' button
    await header.clickDeleteAccount();
    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 16: Place Order: Login before Checkout
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Signup / Login' button
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

  test('Case 17: Remove Products From Cart', async ({ home, header, cart }) => {
    //Arrange
    const productsData: CartProductModel[] = [
      {
        id: 0,
        name: 'Blue Top',
        price: 500,
        quantity: '1',
      },
      {
        id: 2,
        name: 'Sleeveless Dress',
        price: 1000,
        quantity: '1',
      },
    ];

    //Act
    // 4. Add products to cart
    await home.products.addProductNumberAndContinue(productsData[0].id!);
    await home.products.addProductNumberAndContinue(productsData[1].id!);
    // 5. Click 'Cart' button
    await header.openCartPage();
    // 6. Verify that cart page is displayed
    await cart.expectCartPage();
    await cart.expectAddedProducts(productsData);
    // 7. Click 'X' button corresponding to particular product
    await cart.clickDeleteQuantityByName(productsData[0].name);
    //Assert
    // 8. Verify that product is removed from the cart
    await cart.expectAddedOneProduct(productsData[1]);
    await cart.clickDeleteQuantityByName(productsData[1].name);
    await expect(cart.sectionCartEmpty).toBeVisible();

    // Test Case 17: Remove Products From Cart
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click 'X' button corresponding to particular product
    // 8. Verify that product is removed from the cart
  });

  test('Case 18: View Category Products', async ({ home }) => {
    //Arrange
    const womenProductData = {
      category: 'Women',
      products: 'Dress',
      header: data.products.headers.women.dress,
      title: data.title.productWomenDress,
    };

    const menProductData = {
      category: 'Men',
      products: 'Jeans',
      header: data.products.headers.men.jeans,
      title: data.title.productMenJeans,
    };

    //Act
    await home.leftSidebar.expectLeftSidebar();

    await home.leftSidebar.openCategoryByName(womenProductData.category);
    await home.leftSidebar.openCategoryProductsByName(womenProductData.products);

    await home.categoryProducts.expectCategoryProductsPage(womenProductData.title);
    await expect(home.categoryProducts.getHeaderName(womenProductData.header)).toBeVisible();

    await home.leftSidebar.openCategoryByName(menProductData.category);
    await home.leftSidebar.openCategoryProductsByName(menProductData.products);

    await home.categoryProducts.expectCategoryProductsPage(menProductData.title);
    //Assert
    await expect(home.categoryProducts.getHeaderName(menProductData.header)).toBeVisible();

    // Test Case 18: View Category Products
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that categories are visible on left side bar
    // 4. Click on 'Women' category
    // 5. Click on any category link under 'Women' category, for example: Dress
    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    // 7. On left side bar, click on any sub-category link of 'Men' category
    // 8. Verify that user is navigated to that category page
  });

  test('Case 19: View & Cart Brand Products', { tag: ['@smoke'] }, async ({ header, products }) => {
    //Arrange
    const brandsData = {
      polo: data.products.name.polo,
      mastHarbour: data.products.name.mastHarbour,
      headerPolo: data.products.headers.brands.polo,
      HeaderMastHarbour: data.products.headers.brands.mastHarbour,
    };

    //Act
    await header.openProductsPage();
    await products.leftSidebar.expectLeftSidebar();
    await products.leftSidebar.openBrandByName(brandsData.polo);
    await products.brands.expectBrandProductsPage(brandsData.polo, brandsData.headerPolo);
    await products.leftSidebar.openBrandByName(brandsData.mastHarbour);

    //Assert
    await products.brands.expectBrandProductsPage(brandsData.mastHarbour, brandsData.HeaderMastHarbour);

    // Test Case 19: View & Cart Brand Products
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify that Brands are visible on left side bar
    // 5. Click on any brand name
    // 6. Verify that user is navigated to brand page and brand products are displayed
    // 7. On left side bar, click on any other brand link
    // 8. Verify that user is navigated to that brand page and can see products
  });

  test('Case 20: Search Products and Verify Cart After Login', async ({ header, products, cart, login }) => {
    //Arrange
    const search: string = 'Blue';
    const expectProductNumber: number = 7;

    const userLoginData: UserLoginModel = {
      email: process.env.USER_EMAIL as string,
      password: process.env.USER_PASSWORD as string,
    };

    //Act
    // 3. Click on 'Products' button
    await header.openProductsPage();
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await products.expectProductsPage();
    // 5. Enter product name in search input and click search button
    await products.searchProduct(search);
    // 6. Verify 'SEARCHED PRODUCTS' is visible
    await expect(products.singleProduct.first()).toBeVisible();
    // 7. Verify all the products related to search are visible
    await products.isFoundProductsHaveSearchText(search);
    const foundProducts = await products.singleProduct.count();
    expect(foundProducts).toBe(expectProductNumber);
    // 8. Add those products to cart

    //* Catching by $$ selector
    // const addToCarts = await page.$$('div.text-center > a.btn.btn-default.add-to-cart');
    // for (const addToCart of addToCarts) {
    //   await addToCart.click();
    //   await products.clickContinueShopping();
    // }
    //* -----------------------------

    //* Catching by the .all() method
    const addToCarts = await products.buttonAddToCart.all();

    for (const addToCart of addToCarts) {
      await addToCart.click();
      await products.clickContinueShopping();
    }
    //* -----------------------------

    //* Catching by the .count() method
    // const addToCart = products.buttonAddToCart;

    // for (let i = 0; i < (await addToCart.count()); i++) {
    //   await addToCart.nth(i).click();
    //   await products.clickContinueShopping();
    // }
    //* -----------------------------

    // 9. Click 'Cart' button and verify that products are visible in cart
    await header.openCartPage();
    const cartProductNumber = await cart.rowForProduct.count();
    expect(cartProductNumber).toBe(foundProducts);
    // 10. Click 'Signup / Login' button and submit login details
    await header.openSignupLoginPage();
    await login.loginToAccount(userLoginData);
    // 11. Again, go to Cart page
    await header.openCartPage();
    // 12. Verify that those products are visible in cart after login as well
    const cartProductNumberAfterLogin = await cart.rowForProduct.count();
    //Assert
    expect(cartProductNumberAfterLogin).toBe(foundProducts);

    // Test Case 20: Search Products and Verify Cart After Login
    // 1. Launch browser
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

  test('Case 21: Add review on product', async ({ header, products }) => {
    //Arrange
    const reviewData: ProductReviewModel = createProductReview();

    //Act
    await header.openProductsPage();
    await products.expectProductsPage();
    await products.openFirstViewProduct();
    await expect(products.details.linkWriteReview).toBeVisible();
    await products.details.addProductReview(reviewData);

    //Assert
    await products.details.expectSuccessReviewMessage();

    // Test Case 21: Add review on product
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    // 5. Click on 'View Product' button
    // 6. Verify 'Write Your Review' is visible
    // 7. Enter name, email and review
    // 8. Click 'Submit' button
    // 9. Verify success message 'Thank you for your review.'
  });

  test('Case 22: Add to cart from Recommended items', async ({ home, cart }) => {
    //Act
    await home.scrollDownPage();
    await expect.soft(home.headerRecommendedItems).toBeVisible();
    await home.addFromRecommendedItemsAndViewCart();

    //Assert
    await expect(cart.rowForProduct).toBeVisible();

    // Test Case 22: Add to cart from Recommended items
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Scroll to bottom of page
    // 4. Verify 'RECOMMENDED ITEMS' are visible
    // 5. Click on 'Add To Cart' on Recommended product
    // 6. Click on 'View Cart' button
    // 7. Verify that product is displayed in cart page
  });

  test('Case 23: Verify address details in checkout page', async ({ header, signup, home, cart, checkout }) => {
    //Arrange
    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    const productData: number = 0;

    // Act
    // 4. Click 'Signup / Login' button
    await header.openSignupLoginPage();
    // 5. Fill all details in Signup and create account
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(signup.create.headerAccountCreated).toContainText('Account Created!');
    await signup.create.clickContinue();
    // 7. Verify 'Logged in as username' at top
    await header.expectLoggedUser(userBaseData.name);
    // 8. Add products to cart
    await home.products.addProductNumberAndContinue(productData);
    // 9. Click 'Cart' button
    await header.openCartPage();
    // 10. Verify that cart page is displayed
    await cart.expectCartPage();
    // 11. Click Proceed To Checkout
    await cart.clickProceedToCheckout();
    // 12. Verify that the delivery address is same address filled at the time registration of account
    await checkout.checkDeliveryAddress(userAddressInfoData);
    // 13. Verify that the billing address is same address filled at the time registration of account
    await checkout.checkDeliveryInvoice(userAddressInfoData);
    // 14. Click 'Delete Account' button
    await header.clickDeleteAccount();

    //Assert
    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 23: Verify address details in checkout page
    // 1. Launch browser
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

  test('Case 24: Download Invoice after purchase order', async ({ home, header, cart, signup, checkout, payment }) => {
    //Arrange
    const userBaseData: UserSignupModel = createSignupUser();
    const userBasicInfoData: UserSignupBasicInfoModel = createSignupUserBasicInfo();
    const userAddressInfoData: UserSignupAddressInfoModel = createSignupUserAddressInfo();
    const description: CheckoutDescModel = randomDesc();
    const cardData: CardInfoModel = createCardInfoForm();
    const productData: number = 0;

    // Act
    // 4. Add products to cart
    await home.products.addProductNumberAndContinue(productData);
    // 5. Click 'Cart' button
    await header.openCartPage();
    // 6. Verify that cart page is displayed
    await cart.expectCartPage();
    // 7. Click Proceed To Checkout
    await cart.clickProceedToCheckout();
    // 8. Click 'Register / Login' button
    await cart.clickRegisterLogin();
    // 9. Fill all details in Signup and create account
    await signup.registerUser(userBaseData, userBasicInfoData, userAddressInfoData);
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(signup.create.headerAccountCreated).toContainText('Account Created!');
    await signup.create.clickContinue();
    // 11. Verify 'Logged in as username' at top
    await header.expectLoggedUser(userBaseData.name);
    // 12. Click 'Cart' button
    await header.openCartPage();
    // 13. Click 'Proceed To Checkout' button
    await cart.clickProceedToCheckout();
    // 14. Verify Address Details and Review Your Order
    await checkout.checkDeliveryAddress(userAddressInfoData);
    await checkout.checkDeliveryInvoice(userAddressInfoData);
    // 15. Enter description in comment text area and click 'Place Order'
    await checkout.fillDescription(description);
    await checkout.clickPlaceOrder();
    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await payment.fillCardInformation(cardData);
    // 17. Click 'Pay and Confirm Order' button
    // 18. Verify success message 'Your order has been placed successfully!'
    await payment.clickPayAndConfirm();
    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
    await payment.done.downloadInvoice();
    // 20. Click 'Continue' button
    await payment.done.clickContinue();
    // 21. Click 'Delete Account' button
    await header.clickDeleteAccount();

    //Assert
    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(signup.delete.headerAccountDeleted).toContainText('Account Deleted!');
    await signup.delete.clickContinue();

    // Test Case 24: Download Invoice after purchase order
    // 1. Launch browser
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

  test('Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ home }) => {
    //Act
    await home.scrollDownPage();
    await expect(home.footer.headerSubscription).toBeInViewport();
    await home.takeScreenShot('footer');
    await home.clickScrollUpArrow();
    await expect(home.headerFullFledged).toBeInViewport();
    await home.takeScreenShot('header');

    //Assert
    //* Check files in ./e2e/download/ui/home/
    // first assertion: footer.png
    // second assertion: header.png

    // Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Click on arrow at bottom right side to move upward
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });

  test('Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ home }) => {
    //Act
    await home.scrollDownPage();
    await expect(home.footer.headerSubscription).toBeInViewport();
    await home.takeScreenShot('up-arrow');
    await home.scrollUpPage();
    await expect(home.headerFullFledged).toBeInViewport();
    await home.giveMeSmallSecond();
    await home.takeScreenShot('no-arrow');

    //Assert
    //* Check files in ./e2e/download/ui/home/
    // first assertion: up-arrow.png
    // second assertion: no-arrow.png

    // Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Scroll up page to top
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });
});
