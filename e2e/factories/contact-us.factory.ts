import { faker } from '@faker-js/faker';
import { ContactUsModel } from '../models/contact-us.model';

export function createContactUsForm(): ContactUsModel {
  const contactUsForm: ContactUsModel = {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'fakerjs.dev' }),
    subject: faker.lorem.sentence({ min: 5, max: 7 }),
    message: faker.lorem.paragraphs({ min: 2, max: 4 }),
  };
  return contactUsForm;
}
