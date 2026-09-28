import { test, expect } from '@playwright/test';

test('Cappuccino cup has correct cost', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  // ToDo: Assert "Cappuccino" cup conatins text '$19.00'
  // Tip: Use the .filter({ has: child })
  const cappuccinoCup = page.getByRole('heading', { name: 'Cappuccino $' })
  await expect(cappuccinoCup).toContainText('$19.00');
});
