import { UserLoginModel, UserSignupModel } from '@_e2e/models/e2e/login.model';
import { faker } from '@faker-js/faker';

export function createFakeLoginUser(): UserLoginModel {
  const userFakeLoginModel: UserLoginModel = {
    email: faker.internet.email({ provider: 'fakerjs.dev' }),
    password: faker.internet.password(),
  };
  return userFakeLoginModel;
}

export function createSignupUser(sex?: 'female' | 'male'): UserSignupModel {
  const name = faker.person.firstName(sex) ?? faker.person.firstName();
  const userSignupModel: UserSignupModel = {
    name: name,
    email: faker.internet.email({ firstName: name, provider: 'fakerjs.dev' }),
  };
  return userSignupModel;
}
