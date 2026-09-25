import { test, expect } from '@playwright/test';

test('Cart updated correctly after clicking plus for drinks', async ({
  page,
}) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  const espressoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: 'Espresso' });
  const espressoTotalCost = espressoItem.locator('div').nth(3);
  const cappuccinoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: 'Cappuccino' });
  const cappuccinoTotalCost = cappuccinoItem.locator('div').nth(3);

  await expect(espressoTotalCost).toContainText('$10.00');
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(espressoTotalCost).toContainText('$20.00');
  await expect(cappuccinoTotalCost).toContainText('$19.00');
  await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
  await expect(cappuccinoTotalCost).toContainText('$38.00');
  await expect(espressoTotalCost).toContainText('$20.00');
  await expect(page.getByTestId('checkout')).toContainText('$58.00');
});
