import { CreateAccountBodyAPIModel } from '@_e2e/models/api/authentication/create-account.model';
import { expect } from '@playwright/test';

export class ResponseAPIPage {
  constructor() {}

  checkResponseCode(responseBody: CreateAccountBodyAPIModel, code: number): void {
    expect.soft(responseBody.responseCode).toBe(code);
  }

  checkResponseMessage(responseBody: CreateAccountBodyAPIModel, message: string): void {
    expect.soft(responseBody.message).toBe(message);
  }
}
