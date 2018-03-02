import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { MatStepper } from '@angular/material';
import { IAppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { AddProductRequest, UpdateProductRequest } from '../product.actions';
import { selectIsSaving, selectProductById } from '../product.reducer';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    url: '',
    store: 'hm'
  };
  isSaving$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.select(selectIsSaving);
  }

  updateProduct() {
    const update = new UpdateProductRequest({
      _id: this.product._id,
      name: this.product.name,
      size: this.product.size
    });
    this.store.dispatch(update);
  }

  fetchProduct(stepper: MatStepper) {
    this.store.dispatch(new AddProductRequest({product: this.product}));
    this.store.select(selectProductById(this.product.url))
      .pipe(filter(p => !!p))
      .subscribe(product => {
        this.product = product;
        this.product.size = null;
      });
    stepper.next();
  }

}
