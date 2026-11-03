import { type Locator, type Page } from '@playwright/test';
import { billPaymentData } from '../test-data/billPayData';

export class BillPaymentPage {
    page: Page;
    payeeName: Locator;
    address: Locator;
    city: Locator;
    state: Locator;
    zipCode: Locator;
    phone: Locator;
    account: Locator;
    verifyAccount: Locator;
    amount: Locator;
    dropdownFromAccount: Locator;
    sendPaymentButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.payeeName = page.locator('input[name="payee.name"]');
        this.address = page.locator('input[name="payee.address.street"]');
        this.city = page.locator('input[name="payee.address.city"]');
        this.state = page.locator('input[name="payee.address.state"]');
        this.zipCode = page.locator('input[name="payee.address.zipCode"]');
        this.phone = page.locator('input[name="payee.phoneNumber"]');
        this.account = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccount = page.locator('input[name="verifyAccount"]');
        this.amount = page.locator('input[name="amount"]');
        this.dropdownFromAccount = page.locator('select[name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    }


    async fillBillPaymentForm(data: typeof billPaymentData, fromAccountIndex: number) {
        await this.payeeName.fill(data.payeeName);
        await this.address.fill(data.address);
        await this.city.fill(data.city);
        await this.state.fill(data.state);
        await this.zipCode.fill(data.zipCode);
        await this.phone.fill(data.phone);
        await this.account.fill(data.account);
        await this.verifyAccount.fill(data.verifyAccount);
        await this.amount.fill(data.amount);
        await this.dropdownFromAccount.selectOption({ index: fromAccountIndex });
    }

    async clickSendPaymentButton() {
        await this.sendPaymentButton.click();
    }
}
