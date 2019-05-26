import { AuthenticationPage } from './authentication.po';
import * as jsonServer from 'json-server';
import * as middleware from '../mock-backend.middleware.js';
import { ProductsPage } from './products.po';

describe('Products', () => {
  let authPage: AuthenticationPage;
  let productsPage: ProductsPage;
  let server;

  beforeAll(async () => {
    const app = jsonServer.create();
    app.use(jsonServer.defaults());
    app.use(jsonServer.bodyParser);
    app.use(middleware);
    app.use(jsonServer.router(__dirname + '/../mock-backend.json'));
    server = app.listen(3000);
    authPage = new AuthenticationPage();
    productsPage = new ProductsPage();
    await authPage.secondScreen();
    await authPage.navigateToLogin();
    if (!(await authPage.isLoggedIn())) {
      await authPage.login(true);
    }
  });

  afterAll(() => {
    server.close();
  });

  it('should show a list of products', async () => {
    await expect(productsPage.getNumberOfProducts()).toBeGreaterThan(6);
  });

  it('should filter the list of products', async () => {
    await productsPage.toggleFilters();
    await productsPage.toggleSlider('Available');
    await expect(productsPage.getNumberOfProducts()).toBe(1);
    await productsPage.toggleSlider('Available');
    await expect(productsPage.getNumberOfProducts()).toBeGreaterThan(6);
    await productsPage.toggleSlider('unread Update');
    await expect(productsPage.getNumberOfProducts()).toBe(1);
    await productsPage.toggleSlider('unread Update');
    await expect(productsPage.getNumberOfProducts()).toBeGreaterThan(6);
    await productsPage.toggleSlider('low in stock');
    await expect(productsPage.getNumberOfProducts()).toBe(0);
    await productsPage.toggleSlider('low in stock');
    await expect(productsPage.getNumberOfProducts()).toBeGreaterThan(6);
    await productsPage.addStoreFilter();
    await expect(productsPage.getNumberOfProducts()).toBe(1);
    await productsPage.removeStoreFilter();
    await expect(productsPage.getNumberOfProducts()).toBeGreaterThan(6);
    await productsPage.addProductNameFilter('trOUs');
    await expect(productsPage.getNumberOfProducts()).toBe(3);
    await productsPage.removeProductNameFilter();
    await expect(productsPage.getNumberOfProducts()).toBeGreaterThan(6);
  });

});
