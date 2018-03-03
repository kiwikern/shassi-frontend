import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { selectAllProducts, selectIsLoading } from '../product.reducer';
import { Product } from '../product.model';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

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
          )], {optional: true})
      ])
    ])
  ]
})
export class ProductsListComponent implements OnInit {

  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts)
      .pipe(filter(p => !!p));

    this.isLoading$ = this.store.select(selectIsLoading);
  }

}
