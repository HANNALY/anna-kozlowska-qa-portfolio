import { expect, test } from '../../src/fixtures/fixtures';
import { loginData } from '../../src/test-data/loginFormData';

test.describe('Transfer Page', () => {
  test('should transfer funds successfully', async ({ page, loginPage, transferPage }) => {
    await loginPage.fillLoginForm(loginData);
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL(/overview/);
    await transferPage.clickTransferFundsLink();
    await transferPage.fillTransferForm('100', 0, 0);
    await transferPage.clickTransferButton();

    await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');
    await loginPage.clickLogoutLink();
  });
});