import { test, expect } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { MenuPage } from '../../src/pages/MenuPage';

test('Cappuccino cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page);
  await menuPage.open();

  await expect(menuPage.cappuccinoHeading).toContainText('$19.00');
});

