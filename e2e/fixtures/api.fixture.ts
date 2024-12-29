import { test as requestsTest } from '@playwright/test';
import { CreateAccountAPIPage } from '../pages/api/authentication/create-account.page';
import { ResponseAPIPage } from '../pages/api/response/response.page';

interface Requests {
  api: CreateAccountAPIPage;
  apiR: ResponseAPIPage;
}

export const api = requestsTest.extend<Requests>({
  api: async ({ request }, use) => {
    await use(new CreateAccountAPIPage(request));
  },
  apiR: async ({}, use) => {
    await use(new ResponseAPIPage());
  },
});
