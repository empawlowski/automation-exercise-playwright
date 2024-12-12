import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly buttonAcceptDialog: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.buttonAcceptDialog = this.page.getByRole('button', { name: 'Submit' });
  }

  async goTo(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async catchDialog(): Promise<void> {
    this.page.on('dialog', (dialog) => {
      console.log('Dialog message: ', dialog.message());
      console.log('Type of dialog: ', dialog.type());
      dialog.accept();
    });
  }

  async scrollDownPage(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
}
