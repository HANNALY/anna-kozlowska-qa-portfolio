import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Discounted Mocha added to the Cart after promo accepting', async ({
  menuPage,
  cartPage,
}) => {
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await menuPage.addAmericanoToCart();

  await menuPage.promo();
  await menuPage.acceptPromo();

  await cartPage.openCart();

  await expect(cartPage.espressoTotalCost).toContainText(coffeeData.espresso.price);
  await expect(cartPage.mochaDiscountedTotalCost).toContainText(coffeeData.mocha.discountedPrice);
  await expect(cartPage.cappuccinoTotalCost).toContainText(coffeeData.cappuccino.price);
  await expect(cartPage.americanoTotalCost).toContainText(coffeeData.americano.price);
});