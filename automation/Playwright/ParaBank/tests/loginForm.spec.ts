import { test } from '../src/fixtures/fixtures';
import { loginData } from '../src/test-data/loginFormData';

test('should fill login form successfully', async ({ loginPage }) => {
    await loginPage.fillLoginForm(loginData);
    await loginPage.clickLoginButton();
});

test('should logout successfully', async ({ loginPage }) => {
    await loginPage.fillLoginForm(loginData);
    await loginPage.clickLoginButton();
    await loginPage.clickLogoutLink();
});
