import { test, expect } from '@playwright/test';

test('Cart updated correctly after clicking minus for drinks', async ({
  page,
}) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  const espressoItem = cartLocator.getByRole('listitem').filter({
    hasText: 'Espresso',
  });
  const cappuccinoItem = cartLocator.getByRole('listitem').filter({
    hasText: 'Cappuccino',
  });

  await expect(espressoItem).toBeVisible();
  await page.getByRole('button', { name: 'Remove one Espresso' }).click();
  await expect(espressoItem).toBeHidden();
  await expect(cappuccinoItem).toBeVisible();
  await page.getByRole('button', { name: 'Remove one Cappuccino' }).click();
  await expect(cappuccinoItem).toBeHidden();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});
