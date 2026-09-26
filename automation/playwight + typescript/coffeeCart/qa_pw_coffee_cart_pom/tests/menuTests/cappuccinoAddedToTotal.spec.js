import { test, expect } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Cappuccino cost is added to Total on menu page', async ({ page }) => {
  const menuPage = new MenuPage(page);
  await menuPage.open();
  await menuPage.addCappuccinoToCart();

  await expect(menuPage.checkoutTotal).toContainText('Total: $19.00');
});