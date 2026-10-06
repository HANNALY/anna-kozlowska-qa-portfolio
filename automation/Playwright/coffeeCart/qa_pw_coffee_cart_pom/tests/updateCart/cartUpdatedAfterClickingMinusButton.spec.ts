import { test, expect } from '../../src/fixtures/fixtures';

test('Cart updated correctly after clicking minus for drinks', async ({
  menuPage,
  cartPage,
}) => {
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
