import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso removed from Cart after clicking Remove', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();
  await expect(cartPage.espressoItem).toBeVisible();
  await cartPage.clearCartEspresso();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
