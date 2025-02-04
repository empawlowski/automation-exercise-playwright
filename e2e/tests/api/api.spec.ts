import { Configuration } from '@_e2e/config/configuration';
import { expect, test } from '@_e2e/fixtures/base.fixture';

test.describe('APIs List for practice', () => {
  test('API 0: 404 Page', async ({ request, apiR }) => {
    //Assert
    const response = await request.get('/api/notExistEndpoint');
    //Act
    apiR.checkResponseStatus(response, 404);

    // API 0: 404 Page
    // API URL: https://automationexercise.com/api/notExistEndpoint
    // Request Method: GET
    // Response Code: 404
  });

  test('API 0: Bad status code - try catch error', async ({ request, apiR }) => {
    //Assert
    const response = await request.get('/api/productsListIncorrect');

    try {
      JSON.parse(await response.text());
    } catch (error) {
      console.log('Error parsing JSON:', error, await response.text());
    }
    //Act
    apiR.checkResponseStatus(response, 404);

    // API 0: Bad status code
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 400
  });

  test('API 1: GET All Products List', async ({ request, apiR }) => {
    //Assert
    const response = await request.get('/api/productsList');
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
    expect(responseBody.products).toBeTruthy();

    // API 1: Get All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All products list
  });

  test('API 1.1: GET Details Product', async ({ request, apiR }) => {
    //Assert
    const response = await request.get('/api/productsList');
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Assert
    console.log(responseBody.products[0]);
    expect(responseBody.products[0].id).toBe(1);
    expect(responseBody.products[0].name).toBe('Blue Top');
    expect(responseBody.products[0].price).toBe('Rs. 500');
    expect(responseBody.products[0].brand).toBe('Polo');
    expect(responseBody.products[0].category).toBeTruthy();
    expect(responseBody.products[0].category.usertype.usertype).toBe('Women');
    expect(responseBody.products[0].category.category).toBe('Tops');

    // API 1.1: GET Details Product
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: Details for product
  });

  test('API 2: POST To All Products List', async ({ request, apiR }) => {
    //Assert
    const response = await request.post('/api/productsList', {
      data: {
        id: 44,
        name: 'Gray Hoodie',
        price: 'Rs. 660',
        brand: 'Patagonia',
        category: [Object],
      },
    });
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 405);
    apiR.checkResponseMessage(responseBody, 'This request method is not supported.');

    // API 2: POST To All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: POST
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 3: GET All Brands List', async ({ request, apiR }) => {
    //Assert
    const response = await request.get('/api/brandsList');
    const responseBody = await response.json();
    //Act
    expect(response).toBeTruthy();
    apiR.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
    expect(responseBody.brands).toBeTruthy();

    // API 3: GET All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All brands list
  });

  test('API 4: PUT To All Brands List', async ({ request, apiR }) => {
    //Assert
    const response = await request.put('/api/brandsList', {
      data: {
        id: 45,
        brand: 'Patagonia',
      },
    });
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 405);
    apiR.checkResponseMessage(responseBody, 'This request method is not supported.');

    // API 4: PUT To All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: PUT
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 5: POST To Search Product', async ({ request, apiR }) => {
    //Assert
    const response = await request.post('api/searchProduct', {
      form: {
        search_product: 'top',
      },
    });
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
    expect(responseBody.products).toBeTruthy();

    // API 5: POST To Search Product
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Request Parameter: search_product (For example: top, t-shirt, jean)
    // Response Code: 200
    // Response JSON: Searched products list
  });

  test('API 6: POST To Search Product without search_product parameter', async ({ request, apiR }) => {
    //Assert
    const response = await request.post('api/searchProduct');
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 400);
    apiR.checkResponseMessage(responseBody, 'Bad request, search_product parameter is missing in POST request.');

    // API 6: POST To Search Product without search_product parameter
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Response Code: 400
    // Response Message: Bad request, search_product parameter is missing in POST request.
  });

  test('API 7: POST To Verify Login with valid details', async ({ request, apiR }) => {
    //Assert
    const response = await request.post('api/verifyLogin', {
      form: {
        email: Configuration.email,
        password: Configuration.password,
      },
    });
    const responseBody = await response.json();
    //Act
    apiR.checkResponseStatuses(response);
    //Arrange
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
    apiR.checkResponseMessage(responseBody, 'User exists!');

    // API 7: POST To Verify Login with valid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: User exists!
  });

  test('API 8: POST To Verify Login without email parameter', async ({ request, apiR }) => {
    // Arrange
    const response = await request.post('api/verifyLogin', {
      data: {
        password: 'fake!Password00',
      },
    });
    const responseBody = await response.json();
    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 400);
    apiR.checkResponseMessage(responseBody, 'Bad request, email or password parameter is missing in POST request.');

    // API 8: POST To Verify Login without email parameter
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameter: password
    // Response Code: 400
    // Response Message: Bad request, email or password parameter is missing in POST request.
  });

  test('API 9: DELETE To Verify Login', async ({ request, apiR }) => {
    // Arrange
    const response = await request.delete('api/verifyLogin');
    const responseBody = await response.json();
    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 405);
    apiR.checkResponseMessage(responseBody, 'This request method is not supported.');

    // API 9: DELETE To Verify Login
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: DELETE
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 10: POST To Verify Login with invalid details', async ({ request, apiR }) => {
    // Arrange
    const response = await request.post('api/verifyLogin', {
      form: {
        email: 'email@email.email',
        password: 'invalid!Password',
      },
    });
    const responseBody = await response.json();

    // Act
    apiR.checkResponseStatuses(response);

    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 404);
    apiR.checkResponseMessage(responseBody, 'User not found!');

    // API 10: POST To Verify Login with invalid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password (invalid values)
    // Response Code: 404
    // Response Message: User not found!
  });

  test('API 11: POST To Create/Register User Account', async ({ request, apiR }) => {
    //? Remember to use API 12 test to delete created user account
    // Arrange
    const response = await request.post('api/createAccount', {
      headers: {
        Accept: '*/*',
        ContentType: 'application/json',
      },
      form: {
        name: 'fakeAPIName',
        email: 'fake@api.io',
        password: 'fake!Password00',
        title: 'Mr',
        birth_date: '23',
        birth_month: 'May',
        birth_year: '1988',
        firstname: 'FirstName',
        lastname: 'LastName',
        company: 'Company',
        address1: 'Address 1',
        address2: 'Address 2',
        country: 'Australia',
        zipcode: '56-121-78',
        state: 'California',
        city: 'Portland',
        mobile_number: '561-121-121',
      },
    });
    const responseBody = await response.json();

    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 201);
    apiR.checkResponseMessage(responseBody, 'User created!');

    // API 11: POST To Create/Register User Account
    // API URL: https://automationexercise.com/api/createAccount
    // Request Method: POST
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
    // Response Code: 201
    // Response Message: User created!
  });

  test('API 11.1: POST To Create/Register User Account - email exists', async ({ request, apiR }) => {
    // Arrange
    const response = await request.post('api/createAccount', {
      headers: {
        Accept: '*/*',
        ContentType: 'application/json',
      },
      form: {
        name: 'fakeAPIName',
        email: 'fake@api.io',
        password: 'fake!Password00',
        title: 'Mr',
        birth_date: '23',
        birth_month: 'May',
        birth_year: '1988',
        firstname: 'FirstName',
        lastname: 'LastName',
        company: 'Company',
        address1: 'Address 1',
        address2: 'Address 2',
        country: 'Australia',
        zipcode: '56-121-78',
        state: 'California',
        city: 'Portland',
        mobile_number: '561-121-121',
      },
    });
    const responseBody = await response.json();

    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 400);
    apiR.checkResponseMessage(responseBody, 'Email already exists!');

    // API 11.1: POST To Create/Register User Account - email exists
    // API URL: https://automationexercise.com/api/createAccount
    // Request Method: POST
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
    // Response Code: 400
    // Response Message: Email already exists!
  });

  test('API 12: DELETE METHOD To Delete User Account', async ({ request, apiR }) => {
    //? Remember to first create user account with API 11 test
    // Arrange
    const response = await request.delete('api/deleteAccount', {
      form: {
        name: 'fakeAPIName',
        email: 'fake@api.io',
        password: 'fake!Password00',
        title: 'Mr',
        birth_date: '23',
        birth_month: 'May',
        birth_year: '1988',
        firstname: 'FirstName',
        lastname: 'LastName',
        company: 'Company',
        address1: 'Address 1',
        address2: 'Address 2',
        country: 'Australia',
        zipcode: '56-121-78',
        state: 'California',
        city: 'Portland',
        mobile_number: '561-121-121',
      },
    });

    const responseBody = await response.json();

    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
    apiR.checkResponseMessage(responseBody, 'Account deleted!');

    // API 12: DELETE METHOD To Delete User Account
    // API URL: https://automationexercise.com/api/deleteAccount
    // Request Method: DELETE
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: Account deleted!
  });

  test('API 13: PUT METHOD To Update User Account', async ({ request, apiR }) => {
    // Arrange
    const response = await request.put('api/updateAccount', {
      form: {
        name: process.env.USER as string, // 'fakeUserName'
        email: process.env.USER_EMAIL as string, //'fake@email.cc',
        password: process.env.USER_PASSWORD as string, //'fake!Password00',
        title: 'Mr',
        birth_date: '23',
        birth_month: 'May',
        birth_year: '1988',
        firstname: 'FirstName',
        lastname: 'LastName',
        company: 'Company',
        address1: 'Address 1',
        address2: 'Address 2',
        country: 'Australia',
        zipcode: '56-121-78',
        state: 'California',
        city: 'Portland',
        mobile_number: '561-121-121',
      },
    });
    const responseBody = await response.json();

    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
    apiR.checkResponseMessage(responseBody, 'User updated!');

    // API 13: PUT METHOD To Update User Account
    // API URL: https://automationexercise.com/api/updateAccount
    // Request Method: PUT
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number;
    // Response Code: 200
    // Response Message: User updated!
  });

  test('API 13.1: PUT METHOD To Update User Account with invalid details', async ({ request, apiR }) => {
    // Arrange
    const response = await request.put('api/updateAccount', {
      form: {
        name: 'newNameForUsername',
        email: 'email00@email.pw',
        password: 'password',
        title: 'Mr',
        birth_date: '23',
        birth_month: 'May',
        birth_year: '1988',
        firstname: 'FirstName',
        lastname: 'LastName',
        company: 'Company',
        address1: 'Address 1',
        address2: 'Address 2',
        country: 'Australia',
        zipcode: '56-121-78',
        state: 'California',
        city: 'Portland',
        mobile_number: '561-121-121',
      },
    });
    const responseBody = await response.json();

    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 404);
    apiR.checkResponseMessage(responseBody, 'Account not found!');

    // API 13: PUT METHOD To Update User Account
    // API URL: https://automationexercise.com/api/updateAccount
    // Request Method: PUT
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number;
    // Response Code: 404
    // Response Message: Account not found!
  });

  test('API 14: GET user account detail by email', async ({ request, apiR }) => {
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

    // Act
    apiR.checkResponseStatuses(response);
    // Assert
    console.log(responseBody);
    apiR.checkResponseCode(responseBody, 200);
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
