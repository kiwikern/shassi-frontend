import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { selectIsLoading, selectProductById } from '../product.reducer';
import { Observable } from 'rxjs';
import { Product, Update } from '../product.model';
import { DeleteProductRequest, MarkProductReadRequest } from '../product.actions';
import { InfoSnackBarService } from '../../info-snack-bar.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    const loadingFinished$ = this.store.select(selectIsLoading)
      .pipe(filter(isLoading => !isLoading));

    const product$ = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.store.select(selectProductById(id))),
      tap(p => this.checkProduct(p)),
      filter(p => !!p)
    );

    this.product$ = loadingFinished$
      .pipe(
        switchMap(() => product$),
        shareReplay()
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
    } else if (product.hasUnreadUpdate) {
      this.store.dispatch(new MarkProductReadRequest({id: product._id}));
    }
  }
}
