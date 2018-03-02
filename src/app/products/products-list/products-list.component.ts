import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { selectAllProducts } from '../product.reducer';
import { Product } from '../product.model';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts)
      .pipe(filter(p => !!p));
  }

}
