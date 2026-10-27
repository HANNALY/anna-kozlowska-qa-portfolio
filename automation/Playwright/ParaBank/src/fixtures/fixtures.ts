import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { LoginPage } from '../pages/loginPage';
import { mockRegistrationSuccess } from '../mocks/registrationMock';

type ParaBankFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  mockedRegisterPage: RegisterPage;
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
});

export { expect };