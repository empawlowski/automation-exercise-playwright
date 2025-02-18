import { Configuration } from '@_e2e/config/configuration';
import { createAccountApi, updateAccountApi } from '@_e2e/factories/api/authentication/create-account.factory';
import { expect, test } from '@_e2e/fixtures/base.fixture';
import { CreateAccountApiModel, VerifyLoginFormApiModel } from '@_e2e/models/api/authentication/create-account.model';
import { ProductApiModel, UpdateBrandListApiModel } from '@_e2e/models/api/products/products.model';

test.describe('APIs List for practice', () => {
  test('API 0: 404 Page', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const url: string = '/api/notExistEndpoint';
    const response = await apiRequest.get(url);
    //Act
    apiResponse.checkResponseStatus(response, 404);

    // API 0: 404 Page
    // API URL: https://automationexercise.com/api/notExistEndpoint
    // Request Method: GET
    // Response Code: 404
  });

  test('API 0.1: Bad status code - try catch error', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const url: string = '/api/productsListIncorrect';
    const response = await apiRequest.get(url);

    try {
      JSON.parse(await response.text());
    } catch (error) {
      console.log('Error parsing JSON:', error, await response.text());
    }
    //Act
    apiResponse.checkResponseStatus(response, 404);

    // API 0.1: Bad status code
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 400
  });

  test('API 1: GET All Products List', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const response = await apiRequest.get('/api/productsList');
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    expect(responseBody.products).toBeTruthy();

    // API 1: Get All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All products list
  });

  test('API 1.1: GET Details Product', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const product: ProductApiModel = {
      id: 1,
      name: 'Blue Top',
      price: 'Rs. 500',
      brand: 'Polo',
      category: {
        usertype: {
          usertype: 'Women',
        },
        category: 'Tops',
      },
    };

    const url: string = '/api/productsList';
    const response = await apiRequest.get(url);
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    const productId = responseBody.products[0];
    //Assert
    console.log(productId);
    apiResponse.checkProductDetails(productId, product);

    // API 1.1: GET Details Product
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: Details for product
  });

  test('API 1.2: GET Details Product Type-Checking', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const url: string = '/api/productsList';
    const response = await apiRequest.get(url);
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    const productTypes = responseBody.products[0];
    console.log(productTypes);
    expect(productTypes).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: expect.any(Object),
    });

    // API 1.2: GET Details Product
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response: Type-Checking for product
  });

  test('API 2: POST To All Products List', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const url: string = '/api/productsList';
    const data: ProductApiModel = {
      id: 44,
      name: 'Gray Hoodie',
      price: 'Rs. 660',
      brand: 'Patagonia',
      category: {
        usertype: {
          usertype: 'Women',
        },
        category: 'Tops',
      },
    };

    const response = await apiRequest.post(url, data);

    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 405);
    apiResponse.checkResponseMessage(responseBody, 'This request method is not supported.');

    // API 2: POST To All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: POST
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 3: GET All Brands List', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const url: string = '/api/brandsList';
    const response = await apiRequest.get(url);

    const responseBody = await response.json();
    //Act
    expect(response).toBeTruthy();
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    expect(responseBody.brands).toBeTruthy();

    // API 3: GET All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All brands list
  });

  test('API 4: PUT To All Brands List', async ({ apiRequest, apiResponse }) => {
    //Arrange
    const url: string = '/api/brandsList';
    const brandData: UpdateBrandListApiModel = { id: 45, brand: 'Patagonia' };
    const response = await apiRequest.put(url, brandData);
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 405);
    apiResponse.checkResponseMessage(responseBody, 'This request method is not supported.');

    // API 4: PUT To All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: PUT
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 5: POST To Search Product', async ({ request, apiResponse }) => {
    //Arrange
    const url: string = '/api/searchProduct';
    const form = {
      search_product: 'Panda',
    };
    const response = await request.post(url, {
      form: form,
    });

    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    expect(responseBody.products).toBeTruthy();

    // API 5: POST To Search Product
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Request Parameter: search_product (For example: top, t-shirt, jean)
    // Response Code: 200
    // Response JSON: Searched products list
  });

  test('API 6: POST To Search Product without search_product parameter', async ({ request, apiResponse }) => {
    //Arrange
    const url: string = '/api/searchProduct';
    const response = await request.post(url);
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 400);
    apiResponse.checkResponseMessage(responseBody, 'Bad request, search_product parameter is missing in POST request.');

    // API 6: POST To Search Product without search_product parameter
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Response Code: 400
    // Response Message: Bad request, search_product parameter is missing in POST request.
  });

  test('API 7: POST To Verify Login with valid details', async ({ request, apiResponse }) => {
    //Arrange
    const url: string = '/api/verifyLogin';
    const response = await request.post(url, {
      form: { email: Configuration.email, password: Configuration.password },
    });
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    apiResponse.checkResponseMessage(responseBody, 'User exists!');

    // API 7: POST To Verify Login with valid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: User exists!
  });

  test('API 8: POST To Verify Login without email parameter', async ({ request, apiResponse }) => {
    //Arrange
    const url: string = '/api/verifyLogin';
    const data: VerifyLoginFormApiModel = { password: 'fake!Password00' };
    const response = await request.post(url, { data: data });

    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 400);
    apiResponse.checkResponseMessage(responseBody, 'Bad request, email or password parameter is missing in POST request.');

    // API 8: POST To Verify Login without email parameter
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameter: password
    // Response Code: 400
    // Response Message: Bad request, email or password parameter is missing in POST request.
  });

  test('API 9: DELETE To Verify Login', async ({ request, apiResponse }) => {
    // Arrange
    const url: string = '/api/verifyLogin';
    const response = await request.delete(url);
    const responseBody = await response.json();
    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 405);
    apiResponse.checkResponseMessage(responseBody, 'This request method is not supported.');

    // API 9: DELETE To Verify Login
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: DELETE
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 10: POST To Verify Login with invalid details', async ({ request, apiResponse }) => {
    // Arrange
    const url: string = '/api/verifyLogin';
    const form: { email: string; password: string } = {
      email: 'email@email.email',
      password: 'invalid!Password',
    };

    const response = await request.post(url, {
      form: form,
    });
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);

    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 404);
    apiResponse.checkResponseMessage(responseBody, 'User not found!');

    // API 10: POST To Verify Login with invalid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password (invalid values)
    // Response Code: 404
    // Response Message: User not found!
  });

  test('API 11: POST To Create/Register User Account', async ({ apiRequest, apiResponse }) => {
    //? Remember to use API 12 test to delete created user account
    // Arrange
    const url: string = '/api/createAccount';
    const createAccountApiData: CreateAccountApiModel = createAccountApi();
    const response = await apiRequest.createAccount(url, createAccountApiData);
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 201);
    apiResponse.checkResponseMessage(responseBody, 'User created!');

    // API 11: POST To Create/Register User Account
    // API URL: https://automationexercise.com/api/createAccount
    // Request Method: POST
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
    // Response Code: 201
    // Response Message: User created!
  });

  test('API 11.1: POST To Create/Register User Account - email exists', async ({ apiRequest, apiResponse }) => {
    // Arrange
    const url: string = '/api/createAccount';
    const createAccountApiData: CreateAccountApiModel = createAccountApi();
    const response = await apiRequest.createAccount(url, createAccountApiData);
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 400);
    apiResponse.checkResponseMessage(responseBody, 'Email already exists!');

    // API 11.1: POST To Create/Register User Account - email exists
    // API URL: https://automationexercise.com/api/createAccount
    // Request Method: POST
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
    // Response Code: 400
    // Response Message: Email already exists!
  });

  test('API 12: DELETE METHOD To Delete User Account', async ({ apiRequest, apiResponse }) => {
    //? Remember to first create user account with API 11 test
    // Arrange
    const url: string = 'api/deleteAccount';
    const createAccountApiData: CreateAccountApiModel = createAccountApi();
    const response = await apiRequest.deleteAccount(url, createAccountApiData);
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    apiResponse.checkResponseMessage(responseBody, 'Account deleted!');

    // API 12: DELETE METHOD To Delete User Account
    // API URL: https://automationexercise.com/api/deleteAccount
    // Request Method: DELETE
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: Account deleted!
  });

  test('API 13: PUT METHOD To Update User Account', async ({ apiRequest, apiResponse }) => {
    // Arrange
    const url: string = 'api/updateAccount';
    const updateAccountApiData: CreateAccountApiModel = updateAccountApi();
    updateAccountApiData.name = Configuration.user;
    updateAccountApiData.email = Configuration.email;
    updateAccountApiData.password = Configuration.password;

    const response = await apiRequest.updateAccount(url, updateAccountApiData);
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    apiResponse.checkResponseMessage(responseBody, 'User updated!');

    // API 13: PUT METHOD To Update User Account
    // API URL: https://automationexercise.com/api/updateAccount
    // Request Method: PUT
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number;
    // Response Code: 200
    // Response Message: User updated!
  });

  test('API 13.1: PUT METHOD To Update User Account with invalid details', async ({ apiRequest, apiResponse }) => {
    // Arrange
    const url: string = 'api/updateAccount';
    const updateAccountApiData: CreateAccountApiModel = updateAccountApi();
    const response = await apiRequest.updateAccount(url, updateAccountApiData);
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 404);
    apiResponse.checkResponseMessage(responseBody, 'Account not found!');

    // API 13: PUT METHOD To Update User Account
    // API URL: https://automationexercise.com/api/updateAccount
    // Request Method: PUT
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number;
    // Response Code: 404
    // Response Message: Account not found!
  });

  test('API 14: GET user account detail by email', async ({ request, apiResponse }) => {
    // Arrange
    const email: string = Configuration.email;
    const response = await request.get('api/getUserDetailByEmail', {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      params: {
        email: email,
      },
    });
    const responseBody = await response.json();

    //Act
    apiResponse.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiResponse.checkResponseCode(responseBody, 200);
    expect(responseBody.user).toBeTruthy();
    expect(responseBody.user.email).toBe(email);

    // API 14: GET user account detail by email
    // API URL: https://automationexercise.com/api/getUserDetailByEmail
    // Request Method: GET
    // Request Parameters: email
    // Response Code: 200
    // Response JSON: User Detail
  });
});
