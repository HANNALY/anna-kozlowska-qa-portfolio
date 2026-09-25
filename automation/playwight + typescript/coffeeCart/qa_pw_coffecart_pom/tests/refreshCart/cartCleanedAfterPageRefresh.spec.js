import { test, expect } from '@playwright/test';

test('Cart cleaned after page refresh', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  const cappuccinoItem = cartLocator.getByRole('listitem').filter({
    hasText: 'Cappuccino',
  });

  await expect(cappuccinoItem).toBeVisible();
  await page.reload();
  await expect(cappuccinoItem).toBeHidden();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});
