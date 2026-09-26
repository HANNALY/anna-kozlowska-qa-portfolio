import { Page, Locator, expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;

    this.cappuccino = this.page.getByTestId('Cappuccino');
    this.cappuccinoHeading = this.page.getByRole('heading', { name: 'Cappuccino $' });
    this.espresso = this.page.getByTestId('Espresso');
    this.espressoHeading = this.page.getByRole('heading', { name: 'Espresso $' });
    this.americano = this.page.getByTestId('Americano');
    this.checkoutTotal = this.page.getByTestId('checkout');

    this.extraMochaPromo = this.page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );

    this.acceptPromoButton = this.page.getByRole('button', {
      name: 'Yes, of course!',
    });

    this.declinePromoButton = this.page.getByRole('button', {
      name: "Nah, I'll skip.",
    });

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

  async addAmericanoToCart() {
    await this.americano.click();
  }

  async promo() {
    await expect(this.extraMochaPromo).toBeVisible();
  }

  async acceptPromo() {
    await this.acceptPromoButton.click();
  }

  async declinePromo() {
    await this.declinePromoButton.click();
  }

}