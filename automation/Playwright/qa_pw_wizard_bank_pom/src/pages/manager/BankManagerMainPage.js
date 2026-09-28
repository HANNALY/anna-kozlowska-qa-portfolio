export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCustomerButton = this.page.getByRole('button', {
      name: 'Add Customer',
    });

    this.openAccountButton = this.page.getByRole('button', {
      name: 'Open Account',
    });

    this.customersButton = this.page.getByRole('button', {
      name: 'Customers',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager',
    );
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }

  async clickCustomers() {
    await this.customersButton.click();
  }
}







