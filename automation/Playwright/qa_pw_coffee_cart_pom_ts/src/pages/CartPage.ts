import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  page: Page;
  openCartButton: Locator;
  cartUrl: string;
  cartList: Locator;
  cappuccinoItem: Locator;
  cappuccinoName: Locator;
  cappuccinoUnit: Locator;
  cappuccinoTotalCost: Locator;
  espressoItem: Locator;
  espressoName: Locator;
  espressoUnit: Locator;
  espressoTotalCost: Locator;
  americanoItem: Locator;
  americanoName: Locator;
  americanoUnit: Locator;
  americanoTotalCost: Locator;
  mochaDiscountedItem: Locator;
  mochaDiscountedName: Locator;
  mochaDiscountedUnit: Locator;
  mochaDiscountedTotalCost: Locator;
  clearEspressoButton: Locator;
  clearEspressoItemButton: Locator;
  clearCappuccinoButton: Locator;
  clearCappuccinoItemButton: Locator;
  emptyCartMessage: Locator;
  totalCost: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openCartButton = page.getByLabel('Cart page');
    this.cartUrl = 'https://coffee-cart.app/cart';
    this.cartList = page.getByRole('list').nth(1);

    this.cappuccinoItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: 'Cappuccino' });
    this.cappuccinoName = this.cappuccinoItem.locator('div').nth(0);
    this.cappuccinoUnit = this.cappuccinoItem.locator('div').nth(1);
    this.cappuccinoTotalCost = this.cappuccinoItem.locator('div').nth(3);

    this.espressoItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: 'Espresso' });
    this.espressoName = this.espressoItem.locator('div').nth(0);
    this.espressoUnit = this.espressoItem.locator('div').nth(1);
    this.espressoTotalCost = this.espressoItem.locator('div').nth(3);

    this.americanoItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: 'Americano' });
    this.americanoName = this.americanoItem.locator('div').nth(0);
    this.americanoUnit = this.americanoItem.locator('div').nth(1);
    this.americanoTotalCost = this.americanoItem.locator('div').nth(3);

    this.mochaDiscountedItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: '(Discounted) Mocha' });
    this.mochaDiscountedName = this.mochaDiscountedItem.locator('div').nth(0);
    this.mochaDiscountedUnit = this.mochaDiscountedItem.locator('div').nth(1);
    this.mochaDiscountedTotalCost = this.mochaDiscountedItem.locator('div').nth(3);

    this.clearEspressoButton = page.getByLabel('Remove all Espresso');
    this.clearEspressoItemButton = this.espressoItem.getByRole('button', {
      name: 'Remove one Espresso',
    });
    this.clearCappuccinoButton = page.getByLabel('Remove all Cappuccino');
    this.clearCappuccinoItemButton = this.cappuccinoItem.getByRole('button', {
      name: 'Remove one Cappuccino',
    });
    this.emptyCartMessage = page.getByText('No coffee, go add some.');
    this.totalCost = page.getByTestId('checkout');
  }

  async clearCartCappuccino(): Promise<void> {
    await this.clearCappuccinoButton.click();
  }

  async clearCartCappuccinoItem(): Promise<void> {
    await this.clearCappuccinoItemButton.click();
  }

  async clearCartEspresso(): Promise<void> {
    await this.clearEspressoButton.click();
  }

  async clearCartEspressoItem(): Promise<void> {
    await this.clearEspressoItemButton.click();
  }

  async openCart(): Promise<void> {
    await this.openCartButton.click();
    await expect(this.page).toHaveURL(this.cartUrl);
  }
}
