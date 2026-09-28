import { test } from '@playwright/test';
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
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();


  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();


  const addCustomer = new AddCustomerPage(page);


  await addCustomer.open();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostalCode(postalCode);
  await addCustomer.clickAddCustomer();
});


test('Assert manager can search customer by Last Name', async ({ page }) => {
  /*
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table.
  4. Assert no other rows is present in the table.
  */


  const bankManagerHome = new BankManagerMainPage(page);
  const customersList = new CustomersListPage(page);


  await bankManagerHome.open();
  await bankManagerHome.clickCustomers();


  await customersList.searchField(lastName);


  await customersList.assertCustomerExists(lastName);
});



























