import { type Locator, type Page } from '@playwright/test';
import { type RegistrationData } from '../test-data/registerFormData';

export class RegisterPage {
  page: Page;
  firstName: Locator;
    lastName: Locator;
    address: Locator;
    city: Locator;
    state: Locator;
    zipCode: Locator;
    phone: Locator;
    ssn: Locator;
    username: Locator;
    password: Locator;
    confirmPassword: Locator;
    registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[name="customer.firstName"]');
    this.lastName = page.locator('input[name="customer.lastName"]');
    this.address = page.locator('input[name="customer.address.street"]');
    this.city = page.locator('input[name="customer.address.city"]');
    this.state = page.locator('input[name="customer.address.state"]');
    this.zipCode = page.locator('input[name="customer.address.zipCode"]');
    this.phone = page.locator('input[name="customer.phoneNumber"]');
    this.ssn = page.locator('input[name="customer.ssn"]');
    this.username = page.locator('input[name="customer.username"]');
    this.password = page.locator('input[name="customer.password"]');
    this.confirmPassword = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  } 

  async fillRegistrationForm(data: RegistrationData) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.address.fill(data.address);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.zipCode.fill(data.zipCode);
    await this.phone.fill(data.phone);
    await this.ssn.fill(data.ssn);
    await this.username.fill(data.username);
    await this.password.fill(data.password);
    await this.confirmPassword.fill(data.confirmPassword);
  }
  async clickRegisterButton() {
    await this.registerButton.click();
  }
}
