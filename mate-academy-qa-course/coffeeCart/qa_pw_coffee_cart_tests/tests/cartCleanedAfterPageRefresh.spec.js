import { test, expect } from '@playwright/test';

test('Cart cleaned after page refresh', async ({ page }) => {
  /*
  Test:
  1. Open the Coffee Cart menu page https://coffee-cart.app/
  2. Click on the "Cappuccino" cup
  4. Click one the "Cart" link
  5. Wait for the URL https://coffee-cart.app/cart 
  6. Assert Cappucion is visible in the cart
  7. Reload the page
  8. Assert Cappucion is not viisble (hidden) in the cart
  9. Assert the message "No coffee, go add some" is visible

  Tips: 
  1. Use "await page.reload();" to reload the page.
  2. Use filter({hasText: "ItemName"}) to find the required drink row.
    Do not rely on the exact order of the drinks. 
  */
const cartTable = page.getByRole('list').nth(1);
const cappuccinoRow = cartTable
  .getByRole('listitem')
  .filter({ hasText: 'Cappuccino' });

 await page.goto('https://coffee-cart.app/');
 await page.getByTestId('Cappuccino').click();
 await page.getByLabel('Cart page').click();
 await page.waitForURL('https://coffee-cart.app/cart');
 await expect(cappuccinoRow).toBeVisible();
 await page.reload();
 await expect(cappuccinoRow).toBeHidden();
 await expect(page.getByText('No coffee, go add some')).toBeVisible();
});
