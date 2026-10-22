import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';

type ParaBankFixtures = {
  registerPage: RegisterPage;
};

export const test = base.extend<ParaBankFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPageForm = new RegisterPage(page);

    await use(registerPageForm);
  },
});

export { expect };