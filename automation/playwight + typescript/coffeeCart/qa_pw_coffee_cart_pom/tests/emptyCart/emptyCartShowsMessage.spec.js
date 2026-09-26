import { test, expect } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { MenuPage } from '../../src/pages/MenuPage';

test('Empty cart shows correct message', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);
  
  await menuPage.open();
  await cartPage.openCart();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
