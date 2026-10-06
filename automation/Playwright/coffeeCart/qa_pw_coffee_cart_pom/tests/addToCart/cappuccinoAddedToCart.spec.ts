import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Cappuccino correctly added to the Cart', async ({ menuPage, cartPage }) => {
  await menuPage.addCappuccinoToCart();
  await cartPage.openCart();

  await expect(cartPage.cappuccinoName)
    .toContainText(coffeeData.cappuccino.name);

  await expect(cartPage.cappuccinoUnit)
    .toContainText(`${coffeeData.cappuccino.price} x 1`);

  await expect(cartPage.cappuccinoTotalCost)
    .toContainText(coffeeData.cappuccino.price);
});
