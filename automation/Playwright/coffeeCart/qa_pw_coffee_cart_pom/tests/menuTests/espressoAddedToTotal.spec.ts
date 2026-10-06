import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Espresso cost is added to Total on menu page', async ({ menuPage }) => {
  await menuPage.addEspressoToCart();
  await expect(menuPage.checkoutTotal).toContainText(`Total: ${coffeeData.espresso.price}`);
});
