<p align="center">
<img src=https://skillicons.dev/icons?i=vscode,nodejs,js,ts,github />
</p>

# [E2E, API] Automation tests for page: `https://automationexercise.com`

## Hyperlinks for contents

- [Extension](#used-extensions-and-library-in-project)
- [Playwright snippets](#playwright-snippets)
- [Config modifications](#playwright-config-modifications)
- [Installation](#installation)
  - [Project installation](#project-installation)
  - [Prettier](#prettier)
  - [Faker.js](#faker)

## Used extensions and library in project

- ### 🎭 Playwright Test for VSCode
- ### GitHub Actions/ GitLens Inspect
- ### Prettier ([installation bellow](#prettier))
- ### Better Comments
- ### Code Spell Checker
- ### Auto-Open Markdown Preview
- ### VSCode-icons
- ### Faker.js ([installation bellow](#faker)) (`library`)

## Playwright snippets

- advertisements blocker

  ```javascript
  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });
  ```

- interact with the web page `dialogs` [ `products.spec.ts` > `Test Case 6: Contact Us Form` ]

  ```javascript
  page.on('dialog', (dialog) => dialog.accept());
  await page.locator('#dialog').click();
  ```

- `scroll down` the page [ `products.spec.ts` > `Test Case 10: Verify Subscription in home page` ]

  ```javascript
  // Scroll Down
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Scroll Up
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  ```

- `catch` success alert [ `products.spec.ts` > `Test Case 10: Verify Subscription in home page` ]

  ```javascript
  await expect(page.locator('#alert')).toContainText('Success!');
  ```

- `count` all rows in table [ `navbar.spec.ts` > `Test Case 12: Add Products in Cart` ]

  ```javascript
  const rowCount = await page.locator('tr').count();
  await expect(rowCount).toBe(number);
  ```

- use `regex` to check changing link "Logged in as `userName`"

  ```javascript
  /^Logged in as \w+$/;
  ```

- locating by using href link

  ```javascript
  page.locator('[href*="/pageName"]', { hasText: 'Page Name' });
  ```

- examples using loop `for` [ `cart.spec.ts` > `Test Case 20: Search Products and Verify Cart After Login` ]

  - catching by `$$ selector`

    ```javascript
    const loops = await page.$$('selector');

    for (const loop of loops) {
      await loop.click();
    }
    ```

  - catching by `text` and method `.all()`
    ```javascript
    for (const loop of await page.locator('.class').getByText('Text').all()) {
      await loop.click();
    }
    ```
  - catching by `text` and method `.count()`
    ```javascript
    const loop = page.locator('.class').getByText('Text');
    for (let i = 0; i < (await loop.count()); i++) {
      await loop.nth(i).click();
    }
    ```

- `download` method with `console.log` [ `cart.spec.ts` > `Test Case 24: Download Invoice after purchase order` ]

  ```javascript
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download').click();
  const download = await downloadPromise;
  if (download) {
    console.log('File downloaded successfully.');
    await download.saveAs('./test-download/e2e/cart/Invoice.txt');
  } else {
    console.log('File download failed.');
  }
  ```

- `catch` page by `screen` [ `home.spec.ts` > `Test Case 25/26: Verify Scroll Up using/without 'Arrow' button and Scroll Down functionality` ]

  - full page

    ```javascript
    await page.screenshot({ path: './screenshot.png', fullPage: true });
    ```

  - actually visible elements of page

    ```javascript
    await page.screenshot({ path: './screenshot.png' });
    ```

  - element on page

    ```javascript
    await page.locator('.class').screenshot({ path: './screenshot.png' });
    ```

## Playwright Config modifications

- add `timeout` and `expect timeout`
  ```javascript
  timeout: 30 * 1000,
  expect: {
      /**
      * Maximum time expect() should wait for the condition to be met.
      * For example in `await expect(locator).toHaveText();`
      */
        timeout: 5000,
        },
  ```
- add other `attribute` for `testid`
  ```javascript
  use: {
      // Set the test id to use a custom data attribute.
      testIdAttribute: 'data-qa',
      },
  ```
- add `Trace Viewer`, `Video` and `Screenshot` when retrying failed test
  ```javascript
  use: {
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
  ```

## Installation

- ### `Project installation`

  - install commands

    ```javascript
    npm install
    npm init playwright@latest
    ```

- ### `Prettier`

  - install
    ```javascript
    npm install --save-dev --save-exact prettier
    ```
  - configure

    - exclude files in `.prettierignore`

      ```
      package-lock.json
      playwright-report
      test-download
      test-upload
      test-results
      ```

    - set rules in `.prettierrc.json`

      ```javascript
      {
      "singleQuote": true,
      "endOfLine": "auto",
      "printWidth": 150
      }
      ```

- ### `Faker`

  - install
    ```javascript
    npm install --save-dev @faker-js/faker
    ```
  - usage

    ```javascript
    import { faker } from '@faker-js/faker';

    const email = faker.internet.email();
    ```
