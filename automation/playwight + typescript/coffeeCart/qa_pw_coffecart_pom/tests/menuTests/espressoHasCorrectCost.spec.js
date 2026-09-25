import { test, expect } from '@playwright/test';

test('Espresso cup has correct cost', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  const espressoCup = page.getByTestId('Espresso');
  const parent = page.getByRole('listitem').filter({ has: espressoCup });

  await expect(parent).toContainText('$10.00');
});
