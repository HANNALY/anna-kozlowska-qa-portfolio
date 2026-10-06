import { expect, type Locator, type Page } from '@playwright/test';

export class MenuPage {
  page: Page;
  cappuccino: Locator;
  cappuccinoHeading: Locator;
  espresso: Locator;
  espressoHeading: Locator;
  americano: Locator;
  checkoutTotal: Locator;
  extraMochaPromo: Locator;
  acceptPromoButton: Locator;
  declinePromoButton: Locator;

  constructor(page: Page) {
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

  async open(): Promise<void> {
    await this.page.goto('https://coffee-cart.app');
  }

  async addCappuccinoToCart(): Promise<void> {
    await this.cappuccino.click();
  }

  async addEspressoToCart(): Promise<void> {
    await this.espresso.click();
  }

  async addAmericanoToCart(): Promise<void> {
    await this.americano.click();
  }

  async promo(): Promise<void> {
    await expect(this.extraMochaPromo).toBeVisible();
  }

  async acceptPromo(): Promise<void> {
    await this.acceptPromoButton.click();
  }

  async declinePromo(): Promise<void> {
    await this.declinePromoButton.click();
  }
}
