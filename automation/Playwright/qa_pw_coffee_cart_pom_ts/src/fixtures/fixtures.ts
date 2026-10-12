import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { MenuPage } from '../pages/MenuPage';
import { coffeeData } from '../data/testData';

type CoffeeCartFixtures = {
  menuPage: MenuPage;
  cartPage: CartPage;
  shopUrl: string;
  shopData: typeof coffeeData;
};

export const test = base.extend<CoffeeCartFixtures>({
  shopUrl: ['https://coffee-cart.app', { option: true }],
  shopData: [coffeeData, { option: true }],

  menuPage: async ({ page, shopUrl }, use) => {
    const menuPage = new MenuPage(page);
    await page.goto(shopUrl);
    await use(menuPage);
  },

  cartPage: async ({ page, menuPage }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };
