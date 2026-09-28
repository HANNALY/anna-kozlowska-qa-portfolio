import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /*
  Preconditions:
  1. Open Add Customer page.
  2. Fill the First Name.
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const addCustomer = new AddCustomerPage(page);

  await addCustomer.open();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostalCode(postalCode);
  await addCustomer.clickAddCustomer();

  await page.reload();
});

test('Assert manager can delete customer', async ({ page }) => {
  /*
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table.
  4. Reload the page.
  5. Assert customer row is not present in the table.
  */

  const bankManagerHome = new BankManagerMainPage(page);
  const customersList = new CustomersListPage(page);

  await bankManagerHome.open();
  await bankManagerHome.clickCustomers();

  const customerRow = customersList.customerRows.filter({
    hasText: firstName,
  });

  await customersList.deleteCustomer(firstName);

  await expect(customerRow).toHaveCount(0);

  await page.reload();

  await expect(
    customersList.customerRows.filter({
      hasText: firstName,
    }),
  ).toHaveCount(0);
});




















