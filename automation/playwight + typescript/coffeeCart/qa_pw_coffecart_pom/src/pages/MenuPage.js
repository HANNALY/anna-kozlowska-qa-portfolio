import { Page, Locator } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cappuccino = this.page.getByTestId('Cappuccino');
    this.espresso = this.page.getByTestId('Espresso');
  }

  async open() {
    await this.page.goto('https://coffee-cart.app');
  }

  async addCappuccinoToCart() {
    await this.cappuccino.click();
  }

  async addEspressoToCart() {
    await this.espresso.click();
  }
}
