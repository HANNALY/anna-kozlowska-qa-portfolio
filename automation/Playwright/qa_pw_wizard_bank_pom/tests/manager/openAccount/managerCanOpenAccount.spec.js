import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;
let fullName;

test.beforeEach(async ({ page }) => {
  /*
  Preconditions:
  1. Open Add Customer page
  2. Fill the First Name.
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();
  fullName = `${firstName} ${lastName}`;

  const addCustomer = new AddCustomerPage(page);

  await addCustomer.open();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostalCode(postalCode);
  await addCustomer.clickAddCustomer();

  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  /*
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13.
     Use the ".last()" locator to get the last row.
  */

  const openAccount = new OpenAccountPage(page);
  const bankManagerHome = new BankManagerMainPage(page);
  const customersList = new CustomersListPage(page);

  await openAccount.open();

  await openAccount.userSelect(fullName);
  await openAccount.selectCurrency('Dollar');
  await openAccount.process();

  await page.reload();

  await bankManagerHome.open();
  await bankManagerHome.clickCustomers();

  await customersList.assertLastCustomerHasAccountNumber();
});


























