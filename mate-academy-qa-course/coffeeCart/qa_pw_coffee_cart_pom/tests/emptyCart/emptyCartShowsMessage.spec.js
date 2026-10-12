import { test, expect } from '../../src/fixtures/fixtures';

test('Empty cart shows correct message', async ({ cartPage }) => {
  await cartPage.openCart();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
