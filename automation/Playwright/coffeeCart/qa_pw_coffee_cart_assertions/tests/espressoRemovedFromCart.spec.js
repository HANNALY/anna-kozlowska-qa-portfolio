import { test, expect } from '@playwright/test';

test('Espresso removed from Cart after clicking Remove', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');
  await page.getByLabel('Remove all Espresso').click();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});
