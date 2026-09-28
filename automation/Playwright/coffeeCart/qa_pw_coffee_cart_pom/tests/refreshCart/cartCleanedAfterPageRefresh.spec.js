import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart cleaned after page refresh', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();
  const cappuccinoItem = cartPage.cappuccinoItem;

  await expect(cappuccinoItem).toBeVisible();
  await page.reload();
  await expect(cappuccinoItem).toBeHidden();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
