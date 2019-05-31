import { browser, by, element, ExpectedConditions } from 'protractor';

export class AuthenticationPage {
  secondScreen() {
    browser.manage().window().setPosition(-1000, 0);
    return browser.manage().window().maximize();
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateToLogin() {
    return browser.get('/auth/login');
  }

  navigateToLoginViaButton() {
    return element(by.css('a[ng-reflect-router-link="../login"]')).click();
  }

  navigateToRegister() {
    return browser.get('/auth/register');
  }

  navigateToRegisterViaButton() {
    return element(by.css('a[href="/auth/register"]')).click();
  }

  async login(correctPassword: boolean) {
    await element(by.css('input[name=username]')).sendKeys('username');
    if (correctPassword) {
      await element(by.css('input[name=password]')).sendKeys('correct');
    } else {
      await element(by.css('input[name=password]')).sendKeys('wrong1');
    }
    return element(by.css('button[type=submit]')).click();
  }

  async register(correctPassword: boolean) {
    await element(by.css('input[name=username]')).sendKeys('username');
    if (correctPassword) {
      await element(by.css('input[name=password]')).sendKeys('correct');
      await element(by.css('input[name=passwordRepeat]')).sendKeys('correct');
      return element(by.css('button[type=submit]')).click();
    } else {
      await element(by.css('input[name=password]')).sendKeys('correct');
      await element(by.css('input[name=passwordRepeat]')).sendKeys('wrong1');
    }
  }

  registerIsDisabled() {
    return element(by.css('button[type=submit]')).getAttribute('disabled');
  }

  async logout() {
    return element(by.xpath('//button//mat-icon[contains(text(), "exit_to_app")]')).click();
  }

  async getSnackbarText(): Promise<string> {
    const snackbar = element(by.css('simple-snack-bar'));
    await browser.wait(ExpectedConditions.visibilityOf(snackbar), 500);
    return snackbar.getText();
  }

  async getPageTitle() {
    return element(by.css('.mat-card-title')).getText();
  }

  async isLoggedIn() {
    return element(by.xpath('//button//mat-icon[contains(text(), "exit_to_app")]')).isPresent();
  }

}
