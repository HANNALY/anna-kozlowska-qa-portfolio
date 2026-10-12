import { test, expect } from '@playwright/test';

test('Espresso correctly added to the Cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartTable = page.getByRole('list').nth(1);
  const cartTableFirstItem = cartTable.getByRole('listitem').nth(1);
  const cartTableFirstItemName = cartTableFirstItem.locator('div').nth(0);
  const cartTableFirstItemUnit = cartTableFirstItem.locator('div').nth(1);
  const cartTableFirstItemTotal = cartTableFirstItem.locator('div').nth(3);

  await expect(cartTableFirstItemName).toContainText('Espresso');
  await expect(cartTableFirstItemUnit).toContainText('$10.00 x 1');
  await expect(cartTableFirstItemTotal).toContainText('$10.00');
});
