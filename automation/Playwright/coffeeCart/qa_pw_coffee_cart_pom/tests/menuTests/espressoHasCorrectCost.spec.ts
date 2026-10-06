import { test, expect } from '../../src/fixtures/fixtures';
import { coffeeData } from '../../src/data/testData';

test('Espresso cup has correct cost', async ({ menuPage }) => {
  await expect(menuPage.espressoHeading).toContainText(coffeeData.espresso.price);
});