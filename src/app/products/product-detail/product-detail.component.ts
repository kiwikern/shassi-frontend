import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { selectProductById } from '../product.reducer';
import { Observable } from 'rxjs/Observable';
import { Product, Update } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;
  updates$: Observable<Update[]>;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.product$ = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.store.select(selectProductById(id))),
      filter(p => !!p)
    );
    this.updates$ = this.product$.pipe(
      map(p => p.updates),
      filter(u => !!u)
    );
  }

}
