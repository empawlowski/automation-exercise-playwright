import { type Locator, type Page, expect } from '@playwright/test';
import { productData } from '../assets/data/e2e/product.data';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { LeftSidebarComponent } from '../components/left-sidebar.component';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { ProductDetailsPage } from './product-details.page';
import { CartPage } from './cart.page';
import { BrandProducts } from './e2e/brand-products.page';

export class ProductsPage extends BasePage {
  readonly headerComponent: HeaderComponent;
  readonly details: ProductDetailsPage;
  readonly brands: BrandProducts;
  readonly leftSidebar: LeftSidebarComponent;

  readonly header: Locator;

  readonly buttonAddToCart: Locator;
  readonly linkViewProduct: Locator;
  readonly fieldSearchProduct: Locator;
  readonly buttonSearch: Locator;
  readonly headerSearchedProducts: Locator;
  readonly singleProduct: Locator;

  readonly linkViewCart: Locator;
  readonly buttonContinueShopping: Locator;

  readonly hGetInTouch: Locator;

  readonly bDialogSubmit: Locator;

  readonly hSuccessSubmitted: Locator;
  readonly hSuccessSubmittedLocator: Locator;
  readonly bContactUsHome: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.details = new ProductDetailsPage(page);
    this.brands = new BrandProducts(page);
    this.leftSidebar = new LeftSidebarComponent(page);

    this.header = page.getByRole('heading', { name: 'All Products', exact: true });

    this.buttonAddToCart = this.page.locator('.productinfo.text-center').getByText('Add to cart');
    this.linkViewProduct = this.page.getByRole('link', { name: 'View Product' });
    this.fieldSearchProduct = this.page.locator('#search_product');
    this.buttonSearch = this.page.locator('#submit_search');
    this.headerSearchedProducts = this.page.getByRole('heading', { name: 'Searched Products' });
    this.singleProduct = this.page.locator('.single-products');

    this.linkViewCart = this.page.getByRole('link', { name: 'View Cart' });
    this.buttonContinueShopping = this.page.getByRole('button', { name: 'Continue Shopping' });

    this.hGetInTouch = page.getByRole('heading', { name: 'Get in Touch' }); //? used?

    this.bDialogSubmit = page.getByRole('button', { name: 'Submit' }); //? used?

    //? used?
    this.hSuccessSubmitted = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
    this.hSuccessSubmittedLocator = page.locator('.alert-success');
    this.bContactUsHome = page.locator('#form-section').getByRole('link', { name: ' Home' });
  }

  getFirstViewProduct(): Locator {
    return this.linkViewProduct.first();
  }

  async expectProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/products');
    await expect(this.page).toHaveTitle(urlTitleData.products);
    await expect(this.header).toBeVisible();
  }

  async openFirstViewProduct(): Promise<void> {
    await this.getFirstViewProduct().click();
  }

  async searchProduct(search: string): Promise<void> {
    await this.fieldSearchProduct.fill(search);
    await this.buttonSearch.click();
    await expect(this.headerSearchedProducts).toBeVisible();
  }

  async isFoundProductsHaveSearchText(search: string): Promise<void> {
    let products = await this.singleProduct.all();
    if (await this.singleProduct.first().isVisible()) {
      for (let product of products) {
        await expect.soft(product).toContainText(search, { ignoreCase: true });
      }
    } else {
      console.log('No found product');
    }
  }

  async addProductNumberAndContinue(index: number): Promise<void> {
    await this.buttonAddToCart.nth(index).click();
    await this.buttonContinueShopping.click();
  }

  async addProductNumberAndViewCart(index: number): Promise<CartPage> {
    await this.buttonAddToCart.nth(index).click();
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }
}
