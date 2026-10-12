import { test, expect } from '../../src/fixtures/fixtures';

test('Cappuccino removed from Cart after clicking Remove', async ({ menuPage, cartPage }) => {
  await menuPage.addCappuccinoToCart();
  await cartPage.openCart();
  await expect(cartPage.cappuccinoItem).toBeVisible();
  await cartPage.clearCartCappuccino();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
