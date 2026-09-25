import { test } from '@playwright/test';

test('Cappuccino cup added to Cart', async ({ page }) => {
  /*
  1. Open the Coffee Cart menu page https://coffee-cart.app/
  2. Click on the "Cappuccino" cup
  3. Click on the "Cart" link
  4. Wait for the URL https://coffee-cart.app/cart 
  5. Click "+" button to add one more cup of coffee to the cart
  */
 await page.goto('https://coffee-cart.app/');
 await page.getByTestId('Cappuccino').click();
 await page.getByLabel('Cart page').click();
 await page.waitForURL('https://coffee-cart.app/cart')
 
});
