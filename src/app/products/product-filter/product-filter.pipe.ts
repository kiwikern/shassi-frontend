import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product.model';

export interface FilterSetting {
  filteredName: string;
  filteredStores: string[];
}

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], filter?: FilterSetting): any {
    return products.filter(p => this.fulfillsStoreCondition(p, filter) && this.fulfillsNameCondition(p, filter));
  }

  private fulfillsNameCondition(product: Product, filter: FilterSetting): boolean {
    if (!filter.filteredName) {
      return true;
    }
    if (!product.name) {
      return false;
    }
    return product.name.toLowerCase().includes(filter.filteredName.toLowerCase());
  }

  private fulfillsStoreCondition(product: Product, filter: FilterSetting): boolean {
    if (!filter.filteredStores || filter.filteredStores.length === 0) {
      return true;
    }
    if (!product.store) {
      return false;
    }
    return filter.filteredStores.length > 0 && filter.filteredStores.includes(product.store);
  }
}
