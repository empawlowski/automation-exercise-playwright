import { CreateAccountApiModel } from '@_e2e/models/api/authentication/create-account.model';
import { faker } from '@faker-js/faker';

export function createAccountAPI(): CreateAccountApiModel {
  const createAccount: CreateAccountApiModel = {
    name: process.env.USER_API as string,
    email: process.env.USER_API_EMAIL as string,
    password: process.env.USER_PASSWORD as string,
    title: 'Mr',
    birth_date: faker.number.int({ min: 1, max: 31 }).toString(),
    birth_month: faker.date.month(),
    birth_year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress({ useFullAddress: true }),
    address2: faker.location.secondaryAddress(),
    country: 'Australia',
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };
  return createAccount;
}
