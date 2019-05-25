import { AppPage } from './app.po';
import * as jsonServer from 'json-server';
import * as middleware from '../mock-backend.middleware.js';

describe('Authentication', () => {
  let page: AppPage;
  let server;

  beforeAll(async () => {
    const app = jsonServer.create();
    app.use(jsonServer.defaults());
    app.use(jsonServer.bodyParser);
    app.use(middleware);
    app.use(jsonServer.router('mock-backend.json'));
    server = app.listen(3000);
    page = new AppPage();
    await page.secondScreen();
  });

  afterAll(() => {
    server.close();
  });

  it('should reject wrong password', async () => {
    await page.navigateToLogin();
    await page.login(false);
    await expect(page.getSnackbarText()).toContain('Wrong password.');
  });

  it('should login with correct password and logout', async () => {
    await page.navigateToLogin();
    await page.login(true);
    await page.logout();
    await expect(page.getPageTitle()).toEqual('Login');
  });

  it('should navigate via buttons between login/register', async () => {
    await page.navigateToLogin();
    await page.navigateToRegisterViaButton();
    await expect(page.getPageTitle()).toEqual('Register');
    await page.navigateToLoginViaButton();
    await expect(page.getPageTitle()).toEqual('Login');
  });

  it('should reject too short password on registration', async () => {
    await page.navigateToRegister();
    await page.register(false);
    await expect(page.registerIsDisabled()).toBe('true');
  });

  it('should register a user account and redirect to products', async () => {
    await page.navigateToRegister();
    await page.register(true);
    await expect(page.getUrl()).toContain('products');
  });

});
