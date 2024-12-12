// import { urlAPIData } from '../../../assets/data/api/url.data';
// import { CreateUserAPIModel } from '../../../models/signup.model';
// import { APIRequestContext, APIResponse } from '@playwright/test';

// export class CreateUserAPI {
//   private request: APIRequestContext;

//   constructor(request: APIRequestContext) {
//     this.request = request;
//   }

//   async createUser(user: CreateUserAPIModel): Promise<APIResponse> {
//     return this.request.post(urlAPIData.createAccount, {
//       headers: {
//         Accept: '*/*',
//         ContentType: 'application/json',
//       },
//       form: {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         title: user.title,
//         birth_date: user.day,
//         birth_month: user.month,
//         birth_year: user.year,
//         firstname: user.firstName,
//         lastname: user.lastName,
//         company: user.company,
//         address1: user.address,
//         address2: user.address2,
//         country: user.country,
//         zipcode: user.zipCode,
//         state: user.state,
//         city: user.city,
//         mobile_number: user.phoneNumber,
//       },
//     });
//   }
// }

//?

// export interface UserSignupAddressInfoModel {
//     name: 'fakeAPIName',
//     email: 'fake@api.io',
//     password: 'fake!Password00',
//     title: 'Mr',
//     birth_date: '23',
//     birth_month: 'May',
//     birth_year: '1988',
//     firstName: string;
//     lastName: string;
//     company: string;
//     address: string;
//     address2: string;
//     country: string;
//     state: string;
//     city: string;
//     zipCode: string;
//     phoneNumber: string;
//   }

// test('API 11: POST To Create/Register User Account', async ({ request }) => {
//   //Arrange
//   const response = await request.post('api/createAccount', {
//     headers: {
//       Accept: '*/*',
//       ContentType: 'application/json',
//     },
//     form: {
//       name: 'fakeAPIName',
//       email: 'fake@api.io',
//       password: 'fake!Password00',
//       title: 'Mr',
//       birth_date: '23',
//       birth_month: 'May',
//       birth_year: '1988',
//       firstname: 'FirstName',
//       lastname: 'LastName',
//       company: 'Company',
//       address1: 'Address 1',
//       address2: 'Address 2',
//       country: 'Australia',
//       zipcode: '56-121-78',
//       state: 'California',
//       city: 'Portland',
//       mobile_number: '561-121-121',
//     },
//   });
//   const responseBody = JSON.parse(await response.text());

//   //Act
//   expect(response.status()).toBe(200);
//   //Assert
//   console.log(responseBody);
//   expect(responseBody.responseCode).toBe(201);
//   expect(responseBody.message).toBe('User created!');

//   // API 11: POST To Create/Register User Account
//   // API URL: https://automationexercise.com/api/createAccount
//   // Request Method: POST
//   // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
//   // lastname, company, address1, address2, country, zipcode, state, city, mobile_number
//   // Response Code: 201
//   // Response Message: User created!
// });
