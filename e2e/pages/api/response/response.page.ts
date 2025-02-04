import { CreateAccountBodyApiModel } from '@_e2e/models/api/authentication/create-account.model';
import { APIResponse, expect } from '@playwright/test';

export class ResponseAPIPage {
  constructor() {}

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
}
