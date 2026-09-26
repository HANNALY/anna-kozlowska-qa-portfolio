import { page, locator } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    this.openCartButton = this.page.getByLabel('Cart page');
    this.cartUrl = 'https://coffee-cart.app/cart';

    this.cartList = this.page.getByRole('list').nth(1);

    // Cappuccino
    this.cappuccinoItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: 'Cappuccino' });

    this.cappuccinoName = this.cappuccinoItem.locator('div').nth(0);
    this.cappuccinoUnit = this.cappuccinoItem.locator('div').nth(1);
    this.cappuccinoTotalCost = this.cappuccinoItem.locator('div').nth(3);

    // Espresso
    this.espressoItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: 'Espresso' });

    this.espressoName = this.espressoItem.locator('div').nth(0);
    this.espressoUnit = this.espressoItem.locator('div').nth(1);
    this.espressoTotalCost = this.espressoItem.locator('div').nth(3);

    // Americano
    this.americanoItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: 'Americano' });

    this.americanoName = this.americanoItem.locator('div').nth(0);
    this.americanoUnit = this.americanoItem.locator('div').nth(1);
    this.americanoTotalCost = this.americanoItem.locator('div').nth(3);

    // Discounted Mocha
    this.mochaDiscountedItem = this.cartList
      .getByRole('listitem')
      .filter({ hasText: '(Discounted) Mocha' });

    this.mochaDiscountedName =
      this.mochaDiscountedItem.locator('div').nth(0);

    this.mochaDiscountedUnit =
      this.mochaDiscountedItem.locator('div').nth(1);

    this.mochaDiscountedTotalCost =
      this.mochaDiscountedItem.locator('div').nth(3);

    // Empty cart
   this.clearEspressoButton = this.page.getByLabel('Remove all Espresso') 
   this.clearEspressoItemButton = this.espressoItem.getByRole('button', { name: 'Remove one Espresso' });
   this.clearCappuccinoButton = this.page.getByLabel('Remove all Cappuccino');
   this.clearCappuccinoItemButton = this.cappuccinoItem.getByRole('button', { name: 'Remove one Cappuccino' });

    this.emptyCartMessage = this.page.getByText(
      'No coffee, go add some.',
    );

    // Total
    this.totalCost = this.page.getByTestId('checkout');
    
  }
  
  async clearCartCappuccino() {
    await this.clearCappuccinoButton.click();
  }
  async clearCartCappuccinoItem() {
    await this.clearCappuccinoItemButton.click();
  }
   
  async clearCartEspresso() {
    await this.clearEspressoButton.click();
  }

  async clearCartEspressoItem() {
    await this.clearEspressoItemButton.click();
  }
  
  async openCart() {
    await Promise.all([
      this.page.waitForURL(this.cartUrl),
      this.openCartButton.click(),
    ]);
  }
}