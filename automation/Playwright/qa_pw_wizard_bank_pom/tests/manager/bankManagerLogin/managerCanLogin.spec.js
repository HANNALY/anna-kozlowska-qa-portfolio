import { test, expect } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { BankHomePage } from '../../../src/pages/BankHomePage';


test('Assert manager can Login', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const bankHome = new BankHomePage(page);


  await bankHome.open();
  await bankHome.clickManagerLoginButton();
  await expect(managerMainPage.addCustomerButton).toBeVisible();
  await expect(managerMainPage.openAccountButton).toBeVisible();
  await expect(managerMainPage.customersButton).toBeVisible();
  /*
  Test:
  1. Open Wizard bank home page
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
});














