import { test, expect } from '@playwright/test';

test('Discounted Mocha added to the Cart after promo rejecting', async ({
  page,
}) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByTestId('Americano').click();
  await expect(
    page.getByText("It's your lucky day! Get an extra cup of Mocha for $4."),
  ).toBeVisible();
  await page.getByRole('button', { name: "Nah, I'll skip." }).click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  // Espresso
  const espressoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: 'Espresso' });
  await expect(espressoItem).toBeVisible();

  // (Discounted) Mocha
  const mochaDiscountedItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: '(Discounted) Mocha' });
  await expect(mochaDiscountedItem).toBeHidden();

  // Cappuccino
  const cappuccinoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: 'Cappuccino' });
  await expect(cappuccinoItem).toBeVisible();

  // Americano
  const americanoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: 'Americano' });
  await expect(americanoItem).toBeVisible();
});
