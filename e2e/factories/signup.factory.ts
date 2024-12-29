import { UserSignupAddressInfoModel, UserSignupBasicInfoModel } from '@_e2e/models/e2e/signup.model';
import { faker } from '@faker-js/faker';

export function createSignupUserBasicInfo(): UserSignupBasicInfoModel {
  const password = faker.internet.password();
  const day = faker.number.int({ min: 1, max: 31 }).toString();
  const month = faker.date.month();
  const year = faker.number.int({ min: 1900, max: 2021 }).toString();
  return { password, day, month, year };
}

export function createSignupUserAddressInfo(): UserSignupAddressInfoModel {
  const createAddressInfo = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    address2: faker.location.secondaryAddress(),
    country: 'Australia',
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
  };
  return createAddressInfo;
}
