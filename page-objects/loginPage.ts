import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class LoginPage extends HelperBase {
  readonly buttonSignIn: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly siteName: string;

  constructor(page: Page) {
    super(page);
    this.buttonSignIn = page.getByText('Sign In');
    this.emailInput = page.locator("[data-test-id='email-input']");
    this.passwordInput = page.locator('[data-test-id="password-input"]');
    this.loginButton = page.locator('[data-test-id="login-submit-button"]');
    this.siteName = 'lsqa-base-testing-site2';
  }

  async clickSignIn() {
    await this.buttonSignIn.click();
  }

  async chooseYourSite(){
    await this.page.click(`text=${this.siteName}`);
}

  async typeLogin({ username }: { username: string }) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 50000});
    await this.emailInput.fill(username, { timeout: 50000 });
    
  }

  async typePassword({ password }: { password: string }) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 50000 });
    await this.passwordInput.fill(password, { timeout: 50000 });
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
    
  }


}
