import * as data from '@_e2e/assets/data/e2e/app.data.json';
import { FooterComponent } from '@_e2e/components/footer.component';
import { LeftSidebarComponent } from '@_e2e/components/left-sidebar.component';
import { BasePage } from '@_e2e/pages/e2e/base.page';
import { CartPage } from '@_e2e/pages/e2e/cart.page';
import { CategoryProductsPage } from '@_e2e/pages/e2e/products/category-products.page';
import { ProductsPage } from '@_e2e/pages/e2e/products/product.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage extends BasePage {
  readonly headerFullFledged: Locator;
  private readonly linkViewCart: Locator;
  readonly headerRecommendedItems: Locator;
  private readonly linkAddToCartFromRecommendedItems: Locator;

  readonly leftSidebar: LeftSidebarComponent;
  readonly products: ProductsPage;
  readonly categoryProducts: CategoryProductsPage;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    this.headerFullFledged = page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' });
    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });
    this.headerRecommendedItems = page.getByRole('heading', { name: 'Recommended items' });
    this.linkAddToCartFromRecommendedItems = page.locator('#recommended-item-carousel').locator('.add-to-cart');

    this.leftSidebar = new LeftSidebarComponent(page);
    this.products = new ProductsPage(page);
    this.categoryProducts = new CategoryProductsPage(page);
    this.footer = new FooterComponent(page);
  }

  async expectHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(data.title.home);
  }

  async addFromRecommendedItemsAndViewCart(): Promise<CartPage> {
    await this.linkAddToCartFromRecommendedItems.last().click();
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }
}
