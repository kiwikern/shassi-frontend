import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { selectProductById } from '../product.reducer';
import { Observable } from 'rxjs/Observable';
import { Product, Update } from '../product.model';
import { DeleteProductRequest } from '../product.actions';
import { InfoSnackBarService } from '../../info-snack-bar.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;
  updates$: Observable<Update[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: InfoSnackBarService,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.product$ = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.store.select(selectProductById(id))),
      tap(p => this.checkProduct(p)),
      filter(p => !!p)
    );
    this.updates$ = this.product$.pipe(
      map(p => p.updates),
      filter(u => !!u)
    );
  }

  deleteProduct(id) {
    const confirmation = this.snackBar.open('SnackBar.Message.Confirmation.DeleteProduct', 'SnackBar.Action.DeleteProduct');
    confirmation.onAction().subscribe(() => {
      this.router.navigate(['products']);
      this.store.dispatch(new DeleteProductRequest({id}));
    });
  }

  private checkProduct(product: Product) {
    if (!product) {
      this.router.navigate(['/products']);
      this.snackBar.open('SnackBar.Message.Error.ProductNotFound');
    }
  }
}
