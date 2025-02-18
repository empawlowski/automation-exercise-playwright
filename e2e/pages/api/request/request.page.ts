import { CreateAccountApiModel } from '@_e2e/models/api/authentication/create-account.model';
import { ProductApiModel, UpdateBrandListApiModel } from '@_e2e/models/api/products/products.model';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class RequestApiPage {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(url: string): Promise<APIResponse> {
    return this.request.get(url, {
      headers: {
        Accept: '*/*',
        ContentType: 'application/json',
      },
    });
  }

  async post(url: string, data: ProductApiModel): Promise<APIResponse> {
    return this.request.post(url, {
      data: data,
    });
  }

  async put(url: string, data: string | UpdateBrandListApiModel): Promise<APIResponse> {
    return this.request.put(url, {
      data: data,
    });
  }

  async createAccount(url: string, user: CreateAccountApiModel): Promise<APIResponse> {
    return this.request.post(url, {
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

  async updateAccount(url: string, user: CreateAccountApiModel): Promise<APIResponse> {
    return this.request.put(url, {
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

  async deleteAccount(url: string, user: CreateAccountApiModel): Promise<APIResponse> {
    return this.request.delete(url, {
      headers: {
        Accept: '*/*',
        ContentType: 'application/json',
      },
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
