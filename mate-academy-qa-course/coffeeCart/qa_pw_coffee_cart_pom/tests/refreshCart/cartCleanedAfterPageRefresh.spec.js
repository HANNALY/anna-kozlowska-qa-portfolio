import { test, expect } from '../../src/fixtures/fixtures';

test('Cart cleaned after page refresh', async ({ page, menuPage, cartPage }) => {
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();
  const cappuccinoItem = cartPage.cappuccinoItem;

  await expect(cappuccinoItem).toBeVisible();
  await page.reload();
  await expect(cappuccinoItem).toBeHidden();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
