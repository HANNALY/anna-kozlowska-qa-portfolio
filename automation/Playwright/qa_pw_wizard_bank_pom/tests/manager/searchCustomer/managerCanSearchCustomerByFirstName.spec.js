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
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
 
const addCustomer = new AddCustomerPage(page)
   firstName = faker.person.lastName();
   lastName = faker.person.lastName();
   postalCode = faker.location.zipCode();
 
  await addCustomer.open();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostalCode(postalCode);
  await addCustomer.clickAddCustomer();
});


test('Assert manager can search customer by First Name', async ({ page }) => {
  const bankManagerHome = new BankManagerMainPage(page);
  const listCustomer = new CustomersListPage(page);
  await bankManagerHome.open();
  await bankManagerHome.clickCustomers();
  await listCustomer.searchField(firstName);
  await listCustomer.assertCustomerExists(firstName);




  /*
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table.
  4. Assert no other rows is present in the table.
  */
});




























