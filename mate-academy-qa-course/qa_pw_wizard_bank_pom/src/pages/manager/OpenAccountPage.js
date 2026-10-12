export class OpenAccountPage {
  constructor(page) {
    this.page = page;

    this.customerDropdown = this.page.locator('#userSelect');
    this.currencyDropdown = this.page.locator('#currency');
    this.processButton = this.page.getByRole('button', {
      name: 'Process',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async userSelect(customerName) {
    await this.customerDropdown.selectOption({
      label: customerName,
    });
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({
      label: currency,
    });
  }

  async assertCurrencySelected(currencyValue) {
    await expect(this.currencyDropdown).toHaveValue(currencyValue);
  }

  async process() {
    await this.processButton.click();
  }
}









