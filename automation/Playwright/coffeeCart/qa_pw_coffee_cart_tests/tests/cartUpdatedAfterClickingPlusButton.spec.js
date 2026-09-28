import { test, expect } from '@playwright/test';

test('Cart updated after clicking plus for drinks', async ({ page }) => {
  /*
  Test:
  1. Open the Coffee Cart menu page https://coffee-cart.app/
  2. Click on the "Cappuccino" cup
  3. Click on the "Espresso" cup
  4. Click one the "Cart" link
  5. Wait for the URL https://coffee-cart.app/cart 
  6. Assert Total Cost for Espresso is '$10.00'
  7. Click + for Espresso
  8. Assert that Total Cost for Espresso is '$20.00'
  9. Assert Total Cost for Cappuccino is '$19.00'
  10. Click + for Cappucino
  11. Assert Total Cost for Cappuccino is '$38.00'
  12. Assert the Total cost of the Cart is $58.00

  Tip: 
  1. Use filter({hasText: "ItemName"}) to find the required drink row. 
    Do not rely on the exact order of the drinks. 
   */
  const cartTable = page.getByRole('list').nth(1);
  const cappuccinoRow = cartTable
    .getByRole('listitem')
    .filter({ hasText: 'Cappuccino' });
  const espressoRow = cartTable
    .getByRole('listitem')
    .filter({ hasText: 'Espresso' });
const cappuccinoTotal = cappuccinoRow.locator('div').nth(3);
const espressoTotal = espressoRow.locator('div').nth(3);
    
  await page.goto('https://coffee-cart.app/');
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');
  await expect(espressoTotal).toBeVisible();
  await espressoRow.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(espressoTotal).toBeVisible();
  await expect(cappuccinoTotal).toBeVisible();
  await cappuccinoRow.getByRole('button', { name: 'Add one Cappuccino' }).click();
  await expect(cappuccinoTotal).toBeVisible();
  await expect(page.getByTestId('checkout')).toContainText('Total: $58.00');
});
