import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo rejecting', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);  
  await menuPage.open();
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await menuPage.addAmericanoToCart();
  await menuPage.promo();
  await menuPage.declinePromo();
  await cartPage.openCart();
  // Espresso
  await expect(cartPage.espressoItem).toBeVisible();

  // (Discounted) Mocha
  await expect(cartPage.mochaDiscountedItem).toBeHidden();

  // Cappuccino
  await expect(cartPage.cappuccinoItem).toBeVisible();

  // Americano
  await expect(cartPage.americanoItem).toBeVisible();
});
