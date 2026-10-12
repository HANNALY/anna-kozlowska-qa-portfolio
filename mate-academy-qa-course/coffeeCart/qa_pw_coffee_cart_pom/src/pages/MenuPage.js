import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cappuccino = page.getByTestId('Cappuccino');
    this.cappuccinoHeading = page.getByRole('heading', { name: 'Cappuccino $' });
    this.espresso = page.getByTestId('Espresso');
    this.espressoHeading = page.getByRole('heading', { name: 'Espresso $' });
    this.americano = page.getByTestId('Americano');
    this.checkoutTotal = page.getByTestId('checkout');
    this.extraMochaPromo = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.acceptPromoButton = page.getByRole('button', {
      name: 'Yes, of course!',
    });
    this.declinePromoButton = page.getByRole('button', {
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
