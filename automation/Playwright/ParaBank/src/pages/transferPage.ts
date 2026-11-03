import {type Page, Locator} from '@playwright/test';

export class TransferPage {
    page: Page; 
    amountInput: Locator;
    fromAccountDropdown: Locator
    toAccountDropdown: Locator;
    transferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = page.locator('#amount');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.toAccountDropdown = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
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