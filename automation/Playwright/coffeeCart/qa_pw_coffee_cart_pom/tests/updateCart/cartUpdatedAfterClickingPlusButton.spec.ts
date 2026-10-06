import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Cart updated correctly after clicking plus for drinks', async ({
  page,
  menuPage,
  cartPage,
}) => {
  await menuPage.addCappuccinoToCart();
  await menuPage.addEspressoToCart();
  await cartPage.openCart();

  const cartLocator = page.getByRole('list').nth(1);
  const espressoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: coffeeData.espresso.name });
  const espressoTotalCost = espressoItem.locator('div').nth(3);
  const cappuccinoItem = cartLocator
    .getByRole('listitem')
    .filter({ hasText: coffeeData.cappuccino.name });
  const cappuccinoTotalCost = cappuccinoItem.locator('div').nth(3);

  await expect(espressoTotalCost).toContainText(coffeeData.espresso.price);
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(espressoTotalCost).toContainText(coffeeData.espresso.doublePrice);
  await expect(cappuccinoTotalCost).toContainText(coffeeData.cappuccino.price);
  await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
  await expect(cappuccinoTotalCost).toContainText(coffeeData.cappuccino.doublePrice);
  await expect(espressoTotalCost).toContainText(coffeeData.espresso.doublePrice);
  await expect(page.getByTestId('checkout')).toContainText(
    '$58.00',
  );
});
