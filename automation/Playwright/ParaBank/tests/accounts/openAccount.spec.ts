import { test } from '../../src/fixtures/fixtures';
import { loginData } from '../../src/test-data/loginFormData';

test('should open account form successfully and choose account type and from account', async ({ loginPage, openAccountPage }) => {
    await loginPage.fillLoginForm(loginData);
    await loginPage.clickLoginButton();
    await openAccountPage.clickOpenAccountLink();
    await openAccountPage.selectAccountType('1');
    await openAccountPage.selectFromAccount(1);
    await openAccountPage.clickOpenNewAccountButton();
    await loginPage.clickLogoutLink();
});
