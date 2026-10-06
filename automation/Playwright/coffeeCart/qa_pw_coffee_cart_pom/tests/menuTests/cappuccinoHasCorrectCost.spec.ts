import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Cappuccino cup has correct cost', async ({ menuPage }) => {
  await expect(menuPage.cappuccinoHeading).toContainText(coffeeData.cappuccino.price);
});
