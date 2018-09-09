import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { selectAllProducts, selectFilteredName, selectFilteredStores, selectIsLoading } from '../product.reducer';
import { Product } from '../product.model';
import { filter, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { FilterSetting } from '../product-filter/product-filter.pipe';

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

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.products$ = this.store.pipe(
      select(selectAllProducts),
      filter(p => !!p),
      map(products => products.sort((p1, p2) => p1.updatedAt > p2.updatedAt ? -1 : 1))
    );

    this.isLoading$ = this.store.pipe(select(selectIsLoading));

    const filteredName$ = this.store.pipe(select(selectFilteredName));
    const filteredStores$ = this.store.pipe(select(selectFilteredStores));

    this.filter$ = combineLatest(filteredName$, filteredStores$)
      .pipe(
        map(([filteredName, filteredStores, ...rest]) => ({filteredName, filteredStores}))
      );
  }

}
