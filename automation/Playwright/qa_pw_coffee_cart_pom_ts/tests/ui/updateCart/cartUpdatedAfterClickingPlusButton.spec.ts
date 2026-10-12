import { test, expect } from '../../../src/fixtures/fixtures';
import { coffeeData } from '../../../src/data/testData';

test('Cart updates correctly after adding one more of each drink', async ({
  menuPage,
  cartPage,
}) => {
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();

  await expect(cartPage.espressoTotalCost)
    .toContainText(coffeeData.espresso.price);

  await cartPage.espressoItem
    .getByRole('button', { name: 'Add one Espresso' })
    .click();

  await expect(cartPage.espressoTotalCost)
    .toContainText(coffeeData.espresso.doublePrice);

  await expect(cartPage.cappuccinoTotalCost)
    .toContainText(coffeeData.cappuccino.price);

  await cartPage.cappuccinoItem
    .getByRole('button', { name: 'Add one Cappuccino' })
    .click();

  await expect(cartPage.cappuccinoTotalCost)
    .toContainText(coffeeData.cappuccino.doublePrice);

  await expect(cartPage.totalCost).toContainText('$58.00');
});




























