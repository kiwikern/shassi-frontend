import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import {
  selectAllProducts,
  selectFilteredName,
  selectFilteredStores,
  selectFilterOptions,
  selectIsLoading,
  selectLatestProductId
} from '../product.reducer';
import { Product } from '../product.model';
import { filter, map, startWith, take } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { FilterSetting, ProductFilterPipe } from '../product-filter/product-filter.pipe';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('list', [
      transition('true => false', [
        query('div.list-item:enter', [
          style({transform: 'scale(0.5)', opacity: 0}),
          stagger(300, [
            animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
              style({transform: 'scale(1)', opacity: 1})
            )]
          )], {optional: true, limit: 10})
      ])
    ])
  ]
})
export class ProductsListComponent implements OnInit {

  products$: Observable<Product[]>;
  filter$: Observable<FilterSetting>;
  isLoading$: Observable<boolean>;
  @ViewChild('productsViewport') productsViewport: CdkVirtualScrollViewport;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.products$ = this.store.pipe(
      select(selectAllProducts),
      filter(p => !!p),
      map(products => products.sort((p1, p2) => p1.updatedAt > p2.updatedAt ? -1 : 1)),
      startWith(null as Product[])
    );
    this.isLoading$ = this.store.pipe(select(selectIsLoading));

    const filteredName$ = this.store.pipe(select(selectFilteredName));
    const filteredStores$ = this.store.pipe(select(selectFilteredStores));
    const filterOptions$ = this.store.pipe(select(selectFilterOptions));

    this.filter$ = combineLatest([filteredName$, filteredStores$, filterOptions$])
      .pipe(
        map(([filteredName, filteredStores, filterOptions]) => ({filteredName, filteredStores, filterOptions}))
      );

    const latestProductId$ = this.store.pipe(select(selectLatestProductId));

    combineLatest([latestProductId$, this.products$.pipe(filter(p => !!p)), this.filter$, this.isLoading$])
      .pipe(
        filter(([id, products, _, isLoading]) => !!products && !isLoading),
        map(([id, products, filters]) => (new ProductFilterPipe).transform(products, filters)
          .findIndex(p => p._id === id)),
        take(1)
      )
      .subscribe(productIndex => setTimeout(() => this.scrollToItem(productIndex)));

  }

  private scrollToItem(productIndex: number) {
    if (this.productsViewport && productIndex !== -1) {
      this.productsViewport.scrollToIndex(productIndex);
    }
  }
}
