import { CreateAccountAPIModel } from '@_e2e/models/api/authentication/create-account.model';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class CreateAccountAPIPage {
  private request: APIRequestContext;
  private readonly createAccount: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.createAccount = '/api/createAccount';
  }

  async createUser(user: CreateAccountAPIModel): Promise<APIResponse> {
    return this.request.post(this.createAccount, {
      headers: {
        Accept: '*/*',
        ContentType: 'application/json',
      },
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title,
        birth_date: user.birth_date,
        birth_month: user.birth_month,
        birth_year: user.birth_year,
        firstname: user.firstname,
        lastname: user.lastname,
        company: user.company,
        address1: user.address1,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobile_number,
      },
    });
  }
}
