import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Espresso correctly added to the Cart', async ({ menuPage, cartPage }) => {
  await menuPage.addEspressoToCart();
  await cartPage.openCart();

  await expect(cartPage.espressoName)
    .toContainText(coffeeData.espresso.name);

  await expect(cartPage.espressoUnit)
    .toContainText(`${coffeeData.espresso.price} x 1`);

  await expect(cartPage.espressoTotalCost)
    .toContainText(coffeeData.espresso.price);
});
