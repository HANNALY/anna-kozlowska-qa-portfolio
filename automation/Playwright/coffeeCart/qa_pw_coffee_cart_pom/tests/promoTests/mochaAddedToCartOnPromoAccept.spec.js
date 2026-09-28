import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo accepting', async ({
  page,
}) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();

  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await menuPage.addAmericanoToCart();

  await menuPage.promo();
  await menuPage.acceptPromo();

  await cartPage.openCart();

  // Espresso
  await expect(cartPage.espressoTotalCost).toContainText('$10.00');

  // Discounted Mocha
  await expect(cartPage.mochaDiscountedTotalCost).toContainText('$4.00');

  // Cappuccino
  await expect(cartPage.cappuccinoTotalCost).toContainText('$19.00');

  // Americano
  await expect(cartPage.americanoTotalCost).toContainText('$7.00');
});