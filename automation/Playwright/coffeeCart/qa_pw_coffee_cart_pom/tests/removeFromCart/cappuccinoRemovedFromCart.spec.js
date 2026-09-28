import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino removed from Cart after clicking Remove', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addCappuccinoToCart();
  await cartPage.openCart();
  await expect(cartPage.cappuccinoItem).toBeVisible();
  await cartPage.clearCartCappuccino();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});

