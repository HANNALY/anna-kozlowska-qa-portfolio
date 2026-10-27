import { type Locator, type Page } from '@playwright/test';           
import { type LoginData } from '../test-data/loginFormData';          
                                                                                                                                           
export class LoginPage {     
    page: Page;
    login_username: Locator;                                      
    login_password: Locator;
    loginButton: Locator;   
    logout: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.login_username = page.locator('input[name="username"]');   
        this.login_password = page.locator('input[name="password"]');   
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.logout = page.getByRole('link', { name: 'Log Out' });
          }                                                             
                                                                        
    async fillLoginForm(data: LoginData) {
        await this.login_username.fill(data.login_username);
        await this.login_password.fill(data.login_password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickLogoutLink() {
        await this.logout.click();
    }
}