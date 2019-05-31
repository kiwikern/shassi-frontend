import { AuthenticationPage } from './authentication.po';
import * as jsonServer from 'json-server';
import * as middleware from '../mock-backend.middleware.js';
import { ProductsPage } from './products.po';
import { ProductDetailPage } from './product-detail.po';
import { products } from '../mock-backend.json';

describe('ProductDetail', () => {
  let authPage: AuthenticationPage;
  let productDetailPage: ProductDetailPage;
  const productsPage = new ProductsPage();
  let server;

  beforeAll(async () => {
    const app = jsonServer.create();
    app.use(jsonServer.defaults());
    app.use(jsonServer.bodyParser);
    app.use(middleware);
    app.use(jsonServer.router({products}));
    server = app.listen(3000);
    authPage = new AuthenticationPage();
    productDetailPage = new ProductDetailPage();
    await authPage.secondScreen();
    await productDetailPage.navigateToProduct();
    if (!(await authPage.isLoggedIn())) {
      await authPage.navigateToLoginViaButton();
      await authPage.login(true);
    }
  });

  afterAll(() => {
    server.close();
  });

  it('should show the product name and price as title', async () => {
    await expect(productDetailPage.getPageTitle()).toContain('Beautiful Jacket (€12.99)');
  });

  it('should change the order for the price', async () => {
    await expect(productDetailPage.getNthPrice(0)).toBe('€100.00');
    await productDetailPage.changePriceSort();
    await expect(productDetailPage.getNthPrice(0)).toBe('€12.99');
  });

  it('should delete the product', async () => {
    await productDetailPage.deleteProduct();
    await productDetailPage.confirmDelete();
    await productsPage.openFirstProduct();
    await expect(productDetailPage.getPageTitle()).toContain('Trousers');
  });

});
