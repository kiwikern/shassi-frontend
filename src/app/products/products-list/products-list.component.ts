import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { selectAllProducts } from '../product.reducer';
import { Product } from '../product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products$: Store<Product[]>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts);
  }

}
