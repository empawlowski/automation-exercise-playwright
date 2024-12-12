// import { APIRequestContext, APIResponse } from '@playwright/test';

// interface CreateAccountPayload {
//   name: string;
//   email: string;
// }

// export class CreateAccountAPI {
//   private request: APIRequestContext;
//   private baseUrl: string;

//   constructor(request: APIRequestContext) {
//     this.request = request;
//     this.baseUrl = 'api/';
//   }

//   async createAccount(payload: CreateAccountPayload): Promise<APIResponse> {
//     return this.request.post(`${this.baseUrl}createAccount`, {
//       headers: {
//         Accept: '*/*',
//         ContentType: 'application/json',
//       },
//       form: payload,
//     });
//   }
// }
