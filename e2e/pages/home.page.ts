import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { LeftSidebarComponent } from '../components/left-sidebar.component';
import { CategoryProductsPage } from './category-products.page';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { categoryProductsData } from '../assets/data/e2e/category-products.data';
import { CartPage } from './cart.page';
import { FooterComponent } from '../components/footer.component';

export class HomePage extends BasePage {
  readonly brandPolo: Locator;
  readonly brandMastHarbour: Locator;

  readonly hBrandMastHarbour: Locator;
  readonly hBrandPolo: Locator;

  readonly headerRecommendedItems: Locator;

  readonly linkAddToCartFromRecommendedItems: Locator;
  readonly linkViewCart: Locator;

  readonly leftSidebar: LeftSidebarComponent;
  readonly categoryProducts: CategoryProductsPage;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    //* POM for open page and expect page
    this.brandPolo = page.locator('[href*="/brand_products/Polo"]', { hasText: 'Polo' });
    this.brandMastHarbour = page.locator('[href*="/brand_products/Mast & Harbour"]', { hasText: 'Mast & Harbour' });

    this.hBrandMastHarbour = page.getByRole('heading', { name: categoryProductsData.hBrandMastHarbour });
    this.hBrandPolo = page.getByRole('heading', { name: categoryProductsData.hBrandPolo });

    //* POM for Recommended items - page bottom ()
    //Test Case 22: Add to cart from Recommended items
    this.headerRecommendedItems = page.getByRole('heading', { name: 'Recommended items' });
    this.linkAddToCartFromRecommendedItems = page.locator('#recommended-item-carousel').locator('.add-to-cart');
    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });

    this.leftSidebar = new LeftSidebarComponent(page);
    this.categoryProducts = new CategoryProductsPage(page);
    this.footer = new FooterComponent(page);
  }

  async expectHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(urlTitleData.home);
  }

  //TODO:
  async expectBrandPolo(): Promise<void> {
    await expect(this.page).toHaveURL('/brand_products/Polo');
    await expect(this.page).toHaveTitle(urlTitleData.brandPolo);
    await expect(this.hBrandPolo).toBeVisible();
  }

  //TODO:
  async expectBrandMastHarbourPage(): Promise<void> {
    await expect(this.page).toHaveURL('/brand_products/Mast & Harbour');
    await expect(this.page).toHaveTitle(urlTitleData.brandMastHarbour);
    await expect(this.hBrandMastHarbour).toBeVisible();
  }

  //TODO:
  async openBrandMastHarbour(): Promise<void> {
    await this.brandMastHarbour.click();
    await this.expectBrandMastHarbourPage();
  }

  //TODO:
  async openBrandPolo(): Promise<void> {
    await this.brandPolo.click();
    await this.expectBrandPolo();
  }

  async addFromRecommendedItemsAndViewCart(): Promise<CartPage> {
    await this.linkAddToCartFromRecommendedItems.last().click();
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }

  //TODO:
  async scrollUpConfirmByScreen() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.screenshot({ path: './test-download/e2e/home/hSubscription.png' });
    await this.page.locator('#scrollUp').click();
    await this.page.waitForTimeout(1000);
    await this.page.screenshot({ path: './test-download/e2e/home/hAutomationExercise.png' });
  }

  //TODO:
  async noScrollUpConfirmByScreen() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.screenshot({ path: './test-download/e2e/home/noScrollUpHSubscription.png' });
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.screenshot({ path: './test-download/e2e/home/noScrollUpHAutomationExercise.png' });
  }
}
