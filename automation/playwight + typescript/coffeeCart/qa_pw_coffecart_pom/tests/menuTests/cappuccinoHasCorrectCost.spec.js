import { test, expect } from '@playwright/test';

test('Cappuccino cup has correct cost', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  const cappucionCup = page.getByTestId('Cappuccino');
  const parent = page.getByRole('listitem').filter({ has: cappucionCup });

  await expect(parent).toContainText('$19.00');
});
