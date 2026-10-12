import { test, expect } from '../../src/fixtures/fixtures';

test('Espresso removed from Cart after clicking Remove', async ({ menuPage, cartPage }) => {
  await menuPage.addEspressoToCart();
  await cartPage.openCart();
  await expect(cartPage.espressoItem).toBeVisible();
  await cartPage.clearCartEspresso();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
