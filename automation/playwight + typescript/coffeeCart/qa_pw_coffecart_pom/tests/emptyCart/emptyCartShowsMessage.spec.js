import { test, expect } from '@playwright/test';

test('Empty cart shows correct message', async ({ page }) => {
  await page.goto('https://coffee-cart.app/cart');
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});
