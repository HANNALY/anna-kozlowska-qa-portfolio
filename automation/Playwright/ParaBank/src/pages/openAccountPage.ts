import { type Locator, type Page } from '@playwright/test';

export class OpenAccountPage {
    page: Page;
    openAccountForm: Locator;
    accoutTypeDropdown: Locator;
    fromAccountDropdown: Locator;
    openNewAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openAccountForm = page.getByRole('link', { name: 'Open New Account' });
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.accoutTypeDropdown = page.locator('#type');
        this.fromAccountDropdown = page.locator('#fromAccountId');
    }

    async clickOpenAccountLink() {
        await this.openAccountForm.click();
    }

    async selectAccountType(value: '0' | '1') {
        await this.accoutTypeDropdown.selectOption(value);
    }

    async selectFromAccount(index: number) {
        await this.fromAccountDropdown.selectOption({ index });
    }

    async clickOpenNewAccountButton() {
        await this.openNewAccountButton.click();
    }
}
