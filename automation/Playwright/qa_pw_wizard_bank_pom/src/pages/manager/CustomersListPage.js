import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.customerRows = this.page.locator('table tbody tr');

    this.lastCustomerRow = this.customerRows.last();

    this.deleteCustomerButton = this.lastCustomerRow.getByRole('button', {
      name: 'Delete',
    });

    this.searchCustomer = this.page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

  async getCustomerRow(firstName) {
    return this.customerRows.filter({
      hasText: firstName,
    });
  }

  async deleteCustomer(firstName) {
    const customerRow = this.customerRows.filter({
      hasText: firstName,
    });

    await customerRow.getByRole('button', {
      name: 'Delete',
    }).click();
  }

  async deleteLastCustomer() {
    await this.deleteCustomerButton.click();
  }

  async searchField(value) {
    await this.searchCustomer.fill(value);
  }

  async assertLastCustomerFirstName(firstName) {
    await expect(this.lastCustomerRow).toContainText(firstName);
  }

  async assertLastCustomerLastName(lastName) {
    await expect(this.lastCustomerRow).toContainText(lastName);
  }

  async assertLastCustomerPostalCode(postalCode) {
    await expect(this.lastCustomerRow).toContainText(postalCode);
  }

  async assertLastCustomerHasAccountNumber() {
    await expect(
      this.lastCustomerRow.locator('td').nth(3),
    ).not.toBeEmpty();
  }

  async assertLastCustomerHasNoAccountNumber() {
    await expect(
      this.lastCustomerRow.locator('td').nth(3),
    ).toBeEmpty();
  }

  async assertCustomerExists(value) {
    const customerRow = this.customerRows.filter({
      hasText: value,
    });

    await expect(customerRow).toHaveCount(1);
  }
}







