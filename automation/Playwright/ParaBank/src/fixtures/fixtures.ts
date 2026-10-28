import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { LoginPage } from '../pages/loginPage';
import { OpenAccountPage } from '../pages/openAccountPage';
import { mockRegistrationSuccess } from '../mocks/registrationMock';
import { TransferPage } from '../pages/transferPage';

type ParaBankFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  openAccountPage: OpenAccountPage;
  mockedRegisterPage: RegisterPage;
  transferPage: TransferPage;
};

export const test = base.extend<ParaBankFixtures>({
  registerPage: async ({ page }, use) => {
    await page.goto('/parabank/register.htm');
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await page.goto('/parabank/register.htm');
    await use(new LoginPage(page));
  },
  mockedRegisterPage: async ({ page }, use) => {
    await mockRegistrationSuccess(page);
    await page.goto('/parabank/register.htm');
    await use(new RegisterPage(page));
  },
  openAccountPage: async ({ page }, use) => {
    await use(new OpenAccountPage(page));
  },
  transferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  }
});

export { expect };