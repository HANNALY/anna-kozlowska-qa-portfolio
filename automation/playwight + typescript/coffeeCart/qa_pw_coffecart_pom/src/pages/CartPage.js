import { page, locator } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.openCartButton = this.page.getByLabel('Cart page');
    this.cartUrl = 'https://coffee-cart.app/cart';

    this.cartList = this.page.getByRole('list').nth(1);

    this.cappuccinoItem = this.cartList
      .getByRole('listitem')
      .filter({
        hasText: 'Cappuccino',
      });

      this.espressoItem = this.cartList
      .getByRole('listitem')
      .filter({
        hasText: 'Espresso',
      });

    this.cappuccinoName = this.cappuccinoItem.locator('div').nth(0);
    this.cappuccinoUnit = this.cappuccinoItem.locator('div').nth(1);
    this.cappuccinoTotalCost = this.cappuccinoItem.locator('div').nth(3);

    this.espressoName = this.espressoItem.locator('div').nth(0);
    this.espressoUnit = this.espressoItem.locator('div').nth(1);
    this.espressoTotalCost = this.espressoItem.locator('div').nth(3);
  }

  async openCart() {
    await Promise.all([
      this.page.waitForURL(this.cartUrl),
      this.openCartButton.click(),
    ]);
  }
}
