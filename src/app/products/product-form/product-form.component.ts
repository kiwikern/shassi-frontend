import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { MatStepper } from '@angular/material';
import { IAppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { AddProductRequest, UpdateProductRequest } from '../product.actions';
import { selectIsSaving, selectProductByUrl } from '../product.reducer';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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

  constructor(private store: Store<IAppState>,
              private router: Router) {
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
    this.router.navigate(['products']);
  }

  fetchProduct(stepper: MatStepper) {
    this.store.dispatch(new AddProductRequest({product: this.product}));
    this.store.select(selectProductByUrl(this.product.url))
      .pipe(filter(p => !!p))
      .subscribe(product => {
        this.product = product;
        this.product.size = null;
      });
    stepper.next();
  }

}
