import { expect, test } from '@playwright/test';

test.describe('APIs List for practice', () => {
  test('API 0: 404 Page', async ({ request }) => {
    //Assert
    const response = await request.get('/api/notExistEndpoint');
    //Act
    expect(response.status()).toBe(404);
    //Assert

    // API 0: 404 Page
    // API URL: https://automationexercise.com/api/notExistEndpoint
    // Request Method: GET
    // Response Code: 404
  });
  test('API 0: Bad status code', async ({ request }) => {
    //Assert
    test.fail(); //! Test is fail so is true ;-)
    const response = await request.get('/api/productsList');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(400);
    //Assert
    console.log(responseBody);

    // API 0: Bad status code
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 400
  });
  test('API 1: GET All Products List', async ({ request }) => {
    //Assert
    const response = await request.get('/api/productsList');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);

    // API 1: Get All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All products list
  });

  test.fixme('API 1.1: GET Details Product', async ({ request }) => {
    //Assert
    const response = await request.get('/api/productsList/1'); //! id for 1?
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    // expect(responseBody.products.id).toBe(1); //! id details
    // expect(responseBody.products.name).toBe('Blue Top'); //! id details
    // expect(responseBody.products.email).toBeTruthy(); //! some value = pass (for date)
    console.log(responseBody);
    // console.log('Name: ', responseBody.products.name); //! assertion more

    // API 1.1: GET Details Product
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: Details for product
  });

  test('API 2: POST To All Products List', async ({ request }) => {
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
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');

    // API 2: POST To All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: POST
    // Response Code: 405
    // Response Message: This request method is not supported.
  });
  test('API 3: GET All Brands List', async ({ request }) => {
    //Assert
    const response = await request.get('/api/brandsList');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response).toBeTruthy();
    //Arrange
    console.log(responseBody);

    // API 3: GET All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All brands list
  });
  test('API 4: PUT To All Brands List', async ({ request }) => {
    //Assert
    const response = await request.put('/api/brandsList', {
      data: {
        id: 45,
        brand: 'Patagonia',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');

    // API 4: PUT To All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: PUT
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test('API 5: POST To Search Product', async ({ request }) => {
    //Assert
    const response = await request.post('api/searchProduct', {
      form: {
        search_product: 'top',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeTruthy();

    // API 5: POST To Search Product
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Request Parameter: search_product (For example: top, t-shirt, jean)
    // Response Code: 200
    // Response JSON: Searched products list
  });
  test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    //Assert
    const response = await request.post('api/searchProduct');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');

    // expect(responseBody.responseCode).toBe(200);
    // expect(responseBody.message).toBe('This request method is not supported.');

    // API 6: POST To Search Product without search_product parameter
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Response Code: 400
    // Response Message: Bad request, search_product parameter is missing in POST request.
  });
  test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    //Assert
    const response = await request.post('api/verifyLogin', {
      form: {
        email: 'fake@email.cc',
        password: 'fake!Password00',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User exists!');

    // API 7: POST To Verify Login with valid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: User exists!
  });

  test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    //Arrange
    const response = await request.post('api/verifyLogin', {
      data: {
        password: 'fake!Password00',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');

    // API 8: POST To Verify Login without email parameter
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameter: password
    // Response Code: 400
    // Response Message: Bad request, email or password parameter is missing in POST request.
  });
  test('API 9: DELETE To Verify Login', async ({ request }) => {
    //Arrange
    const response = await request.delete('api/verifyLogin');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');

    // API 9: DELETE To Verify Login
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: DELETE
    // Response Code: 405
    // Response Message: This request method is not supported.
  });
  test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    //Arrange
    const response = await request.post('api/verifyLogin', {
      form: {
        email: 'email@email.email',
        password: 'invalid!Password',
      },
    });
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);

    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User not found!');

    // API 10: POST To Verify Login with invalid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password (invalid values)
    // Response Code: 404
    // Response Message: User not found!
  });
  test('API 11: POST To Create/Register User Account', async ({ request }) => {
    //Arrange
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
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe('User created!');

    // API 11: POST To Create/Register User Account
    // API URL: https://automationexercise.com/api/createAccount
    // Request Method: POST
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
    // Response Code: 201
    // Response Message: User created!
  });
  test('API 11.1: POST To Create/Register User Account - email exists', async ({ request }) => {
    //Arrange
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
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Email already exists!');

    // API 11.1: POST To Create/Register User Account - email exists
    // API URL: https://automationexercise.com/api/createAccount
    // Request Method: POST
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
    // Response Code: 400
    // Response Message: Email already exists!
  });
  test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    //Arrange
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

    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('Account deleted!');

    // API 12: DELETE METHOD To Delete User Account
    // API URL: https://automationexercise.com/api/deleteAccount
    // Request Method: DELETE
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: Account deleted!
  });
  test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    //Arrange
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
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User updated!');

    // API 13: PUT METHOD To Update User Account
    // API URL: https://automationexercise.com/api/updateAccount
    // Request Method: PUT
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number;
    // Response Code: 200
    // Response Message: User updated!
  });

  test('API 13.1: PUT METHOD To Update User Account with invalid details', async ({ request }) => {
    //Arrange
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
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('Account not found!');

    // API 13: PUT METHOD To Update User Account
    // API URL: https://automationexercise.com/api/updateAccount
    // Request Method: PUT
    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
    // lastname, company, address1, address2, country, zipcode, state, city, mobile_number;
    // Response Code: 404
    // Response Message: Account not found!
  });

  test.fixme('API 14: GET user account detail by email', async ({ request }) => {
    //Arrange
    // const response = await request.get('api/getUserDetailByEmail', {
    //   form: {
    //     name: userData.logoutUser, // 'fakeUserName'
    //     email: userData.logoutEmail, //'fake@email.cc',
    //     password: userData.fakePassword, //'fake!Password00',
    //     title: 'Mr',
    //     birth_date: '23',
    //     birth_month: 'May',
    //     birth_year: '1988',
    //     firstname: 'FirstName',
    //     lastname: 'LastName',
    //     company: 'Company',
    //     address1: 'Address 1',
    //     address2: 'Address 2',
    //     country: 'Australia',
    //     zipcode: '56-121-78',
    //     state: 'California',
    //     city: 'Portland',
    //     mobile_number: '561-121-121',
    //   },
    // });
    const response = await request.get('api/getUserDetailByEmail', {
      form: {
        email: 'fake@email.cc', //'fake@api.io'
      },
    });
    const responseBody = JSON.parse(await response.text());

    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBeTruthy();

    // API 14: GET user account detail by email
    // API URL: https://automationexercise.com/api/getUserDetailByEmail
    // Request Method: GET
    // Request Parameters: email
    // Response Code: 200
    // Response JSON: User Detail
  });
});
