import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();

  await expect(cartPage.espressoName)
    .toContainText('Espresso');

  await expect(cartPage.espressoUnit)
    .toContainText('$10.00 x 1');
    
  await expect(cartPage.espressoTotalCost)
    .toContainText('$10.00');
});
