import { CreateAccountAPIPage } from '@_e2e/pages/api/authentication/create-account.page';
import { ResponseAPIPage } from '@_e2e/pages/api/response/response.page';
import { test as requestsTest } from '@playwright/test';

interface Requests {
  api: CreateAccountAPIPage;
  apiR: ResponseAPIPage;
}

export const api = requestsTest.extend<Requests>({
  api: async ({ request }, use) => {
    await use(new CreateAccountAPIPage(request));
  },
  apiR: async () => {
    new ResponseAPIPage();
  },
});
