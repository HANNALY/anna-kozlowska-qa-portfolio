import {type Page, Locator} from '@playwright/test';

export class TransferPage {
    page: Page; 
    transferFundsForm: Locator;
    amountInput: Locator;
    fromAccountDropdown: Locator
    toAccountDropdown: Locator;
    transferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferFundsForm = page.getByRole('link', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.toAccountDropdown = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
    }

    async clickTransferFundsLink() {
        await this.transferFundsForm.click();
    }

    async fillTransferForm(amount: string, fromAccountIndex: number, toAccountIndex: number) {
        await this.amountInput.fill(amount);
        await this.fromAccountDropdown.selectOption({ index: fromAccountIndex });
        await this.toAccountDropdown.selectOption({ index: toAccountIndex });
    }

    async clickTransferButton() {
        await this.transferButton.click();
    }
}