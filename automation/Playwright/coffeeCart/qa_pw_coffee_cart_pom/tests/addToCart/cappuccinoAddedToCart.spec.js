import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addCappuccinoToCart();
  await cartPage.openCart();

  await expect(cartPage.cappuccinoName)
    .toContainText('Cappuccino');

  await expect(cartPage.cappuccinoUnit)
    .toContainText('$19.00 x 1');

  await expect(cartPage.cappuccinoTotalCost)
    .toContainText('$19.00');
});
