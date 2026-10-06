import { test, expect } from '../../src/fixtures/fixtures';

test('Discounted Mocha added to the Cart after promo rejecting', async ({
  menuPage,
  cartPage,
}) => {
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await menuPage.addAmericanoToCart();
  await menuPage.promo();
  await menuPage.declinePromo();
  await cartPage.openCart();

  await expect(cartPage.espressoItem).toBeVisible();
  await expect(cartPage.mochaDiscountedItem).toBeHidden();
  await expect(cartPage.cappuccinoItem).toBeVisible();
  await expect(cartPage.americanoItem).toBeVisible();
});
