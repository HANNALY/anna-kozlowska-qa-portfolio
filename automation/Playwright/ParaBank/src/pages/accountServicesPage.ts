import { Locator, Page } from '@playwright/test';
export class AccountServicesPage {
    page: Page;
    openNewAccountLink: Locator;
    transferFundsLink: Locator;
    billPayLink: Locator;
    logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
        this.logoutLink = page.getByRole('link', { name: 'Log Out' });
    }

    async clickOpenNewAccount() {
        await this.openNewAccountLink.click();
    }

    async clickTransferFunds() {
        await this.transferFundsLink.click();
    }

    async clickBillPay() {
        await this.billPayLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }
}