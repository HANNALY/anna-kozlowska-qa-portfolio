export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.firstNameField = this.page.getByPlaceholder('First Name');
    this.lastNameField = this.page.getByPlaceholder('Last Name');
    this.postalCodeField = this.page.getByPlaceholder('Post Code');

    this.addCustomerButton = this.page
      .getByRole('form')
      .getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(value) {
    await this.firstNameField.fill(value);
  }

  async fillLastName(value) {
    await this.lastNameField.fill(value);
  }

  async fillPostalCode(value) {
    await this.postalCodeField.fill(value);
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }
}









