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
    try {
      this.validateProductStructure(product);
    } catch (error) {
      throw new Error(`Product validation failed: ${error}`);
    }
    expect(responseBody.id).toBe(product.id);
    expect(responseBody.name).toBe(product.name);
    expect(responseBody.price).toBe(product.price);
    expect(responseBody.brand).toBe(product.brand);
    expect(responseBody.category).toBeTruthy();
    expect(responseBody.category.usertype.usertype).toBe(product.category.usertype.usertype);
    expect(responseBody.category.category).toBe(product.category.category);
  }

  private validateProductStructure(product: unknown): void {
    //? Type guard to ensure we're working with an object
    if (!product || typeof product !== 'object') {
      throw new Error('Product must be an object');
    }

    //? Type guard to help TypeScript understand we're working with an object
    const productObj = product as Record<string, unknown>;

    //? Check if all required properties exist
    const requiredProps = ['id', 'name', 'price', 'brand', 'category'];

    requiredProps.forEach((properties) => {
      if (productObj[properties] === undefined) {
        throw new Error(`Missing required property: ${properties}`);
      }
    });

    //? Check types
    if (typeof productObj.id !== 'number') throw new Error('Product id must be a number');
    if (typeof productObj.name !== 'string') throw new Error('Product name must be a string');
    if (typeof productObj.price !== 'string') throw new Error('Product price must be a string');
    if (typeof productObj.brand !== 'string') throw new Error('Product brand must be a string');

    //? Validate category structure
    if (!productObj.category || typeof productObj.category !== 'object') {
      throw new Error('Product category must be an object');
    }

    //? Type guard for category
    const category = productObj.category as Record<string, unknown>;

    if (typeof category.category !== 'string') {
      throw new Error('Category.category must be a string');
    }

    if (!category.usertype || typeof category.usertype !== 'object') {
      throw new Error('Category.usertype must be an object');
    }

    //? Type guard for usertype
    const usertype = category.usertype as Record<string, unknown>;

    if (typeof usertype.usertype !== 'string') {
      throw new Error('Category.usertype.usertype must be a string');
    }
  }
}
