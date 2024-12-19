import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './e2e/base.page';
import { HeaderComponent } from '../components/header.component';
import { LeftSidebarComponent } from '../components/left-sidebar.component';
import { ProductDetailsPage } from './product-details.page';
import { CartPage } from './cart.page';
import { BrandProducts } from './e2e/brand-products.page';
import * as data from '../assets/data/e2e/app.data.json';

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

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.details = new ProductDetailsPage(page);
    this.brands = new BrandProducts(page);
    this.leftSidebar = new LeftSidebarComponent(page);

    this.header = page.getByRole('heading', { name: 'All Products', exact: true });

    // this.buttonAddToCart = page.locator('.productinfo.text-center').getByText('Add to cart');
    this.buttonAddToCart = page.locator('.text-center').getByText('Add to cart');
    this.linkViewProduct = page.getByRole('link', { name: 'View Product' });
    this.fieldSearchProduct = page.locator('#search_product');
    this.buttonSearch = page.locator('#submit_search');
    this.headerSearchedProducts = page.getByRole('heading', { name: 'Searched Products' });
    this.singleProduct = page.locator('.single-products');

    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });
    this.buttonContinueShopping = page.getByRole('button', { name: 'Continue Shopping' });
  }

  getFirstViewProduct(): Locator {
    return this.linkViewProduct.first();
  }

  async expectProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/products');
    await expect(this.page).toHaveTitle(data.title.products);
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

  async clickContinueShopping(): Promise<void> {
    await this.buttonContinueShopping.click();
  }

  async addProductNumberAndContinue(index: number): Promise<void> {
    await this.buttonAddToCart.nth(index).click();
    await this.clickContinueShopping();
  }

  async addProductNumberAndViewCart(index: number): Promise<CartPage> {
    await this.buttonAddToCart.nth(index).click();
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }
}
