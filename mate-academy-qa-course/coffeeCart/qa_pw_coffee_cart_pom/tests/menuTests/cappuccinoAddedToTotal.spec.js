import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Cappuccino cost is added to Total on menu page', async ({ menuPage }) => {
  await menuPage.addCappuccinoToCart();

  await expect(menuPage.checkoutTotal).toContainText(`Total: ${coffeeData.cappuccino.price}`);
});