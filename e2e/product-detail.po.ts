import { browser, by, element } from 'protractor';

export class ProductDetailPage {
  async navigateToProduct() {
    await browser.get('/products/2haa7u37893873');
  }

  async getPageTitle() {
    return element(by.css('.mat-card-title')).getText();
  }

  async deleteProduct() {
    await element(by.xpath('//button//mat-icon[contains(text(), "delete")]')).click();
  }

  async confirmDelete() {
    await element(by.css('.mat-simple-snackbar-action')).click();
  }

  async getNthPrice(i: number) {
    return element.all(by.css('.cdk-column-price.mat-cell')).get(i).getText();
  }

  async changePriceSort() {
    return element(by.css('.cdk-column-price.mat-header-cell')).click();
  }
}
