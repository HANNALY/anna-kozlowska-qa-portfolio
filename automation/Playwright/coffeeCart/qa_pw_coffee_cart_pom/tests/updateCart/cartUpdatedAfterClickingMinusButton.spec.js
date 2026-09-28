import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking minus for drinks', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();

  const espressoItem = cartPage.espressoItem;
  const cappuccinoItem = cartPage.cappuccinoItem;

  await expect(espressoItem).toBeVisible();
  await cartPage.clearCartEspressoItem();
  await expect(espressoItem).toBeHidden();
  await expect(cappuccinoItem).toBeVisible();
  await cartPage.clearCartCappuccinoItem();
  await expect(cappuccinoItem).toBeHidden();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
