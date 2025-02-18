import { CreateAccountBodyApiModel } from '@_e2e/models/api/authentication/create-account.model';
import { ProductApiModel } from '@_e2e/models/api/products/products.model';
import { APIResponse, expect } from '@playwright/test';

export class ResponseApiPage {
  checkResponseStatus(response: APIResponse, code: number = 200): void {
    expect.soft(response.status()).toBe(code);
  }

  checkResponseStatuses(response: APIResponse, code: number = 200): void {
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(code);
  }

  checkResponseCode(responseBody: CreateAccountBodyApiModel, code: number): void {
    expect.soft(responseBody.responseCode).toBe(code);
  }

  checkResponseMessage(responseBody: CreateAccountBodyApiModel, message: string): void {
    expect.soft(responseBody.message).toBe(message);
  }

  checkProductDetails(responseBody: ProductApiModel, product: ProductApiModel): void {
    expect(responseBody.id).toBe(product.id);
    expect(responseBody.name).toBe(product.name);
    expect(responseBody.price).toBe(product.price);
    expect(responseBody.brand).toBe(product.brand);
    expect(responseBody.category).toBeTruthy();
    expect(responseBody.category.usertype.usertype).toBe(product.category.usertype.usertype);
    expect(responseBody.category.category).toBe(product.category.category);
  }
}
