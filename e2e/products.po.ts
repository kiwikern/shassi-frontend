import { by, element, Key } from 'protractor';

export class ProductsPage {
  async getNumberOfProducts() {
    return element.all(by.css('app-product-list-item')).count();
  }

  async toggleFilters() {
    return element(by.xpath('//button//mat-icon[contains(text(), "filter_list")]')).click();
  }

  async toggleSlider(name: string) {
    return element(by.xpath(`//mat-slide-toggle//span[contains(text(), "${name}")]`)).click();
  }

  async addStoreFilter() {
    await element(by.css('mat-select[placeholder="Stores"')).click();
    await element(by.css('#mat-option-0')).click();
    await element(by.css('#mat-option-0')).sendKeys(Key.ESCAPE);
  }

  async removeStoreFilter() {
    await element.all(by.xpath('//button//mat-icon[contains(text(), "delete")]')).get(0).click();
  }

  async removeProductNameFilter() {
    await element.all(by.xpath('//button//mat-icon[contains(text(), "delete")]')).get(1).click();
  }

  async addProductNameFilter(name: string) {
    await element(by.css('input[placeholder="Product name"]')).sendKeys(name);
  }

  async openFirstProduct() {
    await element.all(by.css('app-product-list-item')).get(0).click();
  }

  async navigateBack() {
    await element(by.xpath('//button//mat-icon[contains(text(), "arrow_back")]')).click();
  }

  async getNumberOfUnreadProducts() {
    return element.all(by.css('.isUnread')).count();
  }
}
