import { expect, test } from '../../src/fixtures/fixtures';   
import { billPaymentData } from '../../src/test-data/billPayData';
import { loginData } from '../../src/test-data/loginFormData';

test.describe('Bill Payment Form', () => {
    test('should fill bill payment form successfully', async ({ page, loginPage, accountServicesPage, billPaymentPage }) => {
        await loginPage.fillLoginForm(loginData);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(/overview/);
        await accountServicesPage.clickBillPay();
        await billPaymentPage.fillBillPaymentForm(billPaymentData, 1);
        await billPaymentPage.clickSendPaymentButton();     
        await expect(page.locator('#rightPanel')).toContainText('Bill Payment Complete');
        await accountServicesPage.clickLogout();
    });
});