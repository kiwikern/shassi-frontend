import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {
  AddProduct,
  AddProductFail,
  AddProductRequest,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductRequest,
  LoadProducts,
  LoadProductsFail,
  LoadProductsRequest,
  ProductActionTypes,
  UpdateProduct,
  UpdateProductFail,
  UpdateProductRequest
} from './product.actions';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Logout } from '../auth/auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { of } from 'rxjs/observable/of';
import { InfoSnackBarService } from '../info-snack-bar.service';


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private snackBar: InfoSnackBarService) {
  }

  @Effect() load$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.LoadProductsRequest),
    mergeMap((action: LoadProductsRequest) =>
      this.http.get<Product[]>('/api/products').pipe(
        map(products => new LoadProducts({products})),
        catchError(err => this.handleError(err, new LoadProductsFail()))
      ))
  );

  @Effect() add$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.AddProductRequest),
    mergeMap((action: AddProductRequest) =>
      this.http.post<Product>('/api/products', action.payload.product).pipe(
        map(product => new AddProduct({product})),
        catchError(err => this.handleError(err, new AddProductFail()))
      ))
  );

  @Effect() update$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.UpdateProductRequest),
    mergeMap((action: UpdateProductRequest) => {
      const id: string = action.payload._id;
      return this.http.post<Product>(`/api/products/${id}`, action.payload).pipe(
        map(product => new UpdateProduct({product: {id, changes: product}})),
        catchError(err => this.handleError(err, new UpdateProductFail()))
      );
    })
  );

  @Effect() delete$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.DeleteProductRequest),
    mergeMap((action: DeleteProductRequest) => {
      const id: string = action.payload.id;
      return this.http.delete<string>(`/api/products/${id}`, {responseType: 'text' as 'json'}).pipe(
        map(() => new DeleteProduct({id})),
        tap(() => this.snackBar.open('SnackBar.Message.Error.ProductDeleted')),
        catchError(err => this.handleError(err, new DeleteProductFail()))
      );
    })
  );

  private handleError(error: HttpErrorResponse, action): Observable<any> {
    const actions = [action];
    switch (error.status) {
      case 0:
        this.snackBar.open('SnackBar.Message.Error.NoInternetConnection');
        break;
      case 401:
        this.snackBar.open('SnackBar.Message.Error.LoginNeeded');
        actions.push(new Logout());
        break;
      case 404:
        this.snackBar.open('SnackBar.Message.Error.NoFileFoundForEdit');
        // actions.push(new LoadProductsRequest());
        break;
      case 409:
        this.snackBar.open('SnackBar.Message.Error.ProductAlreadyExists');
        if (error.error && error.error._id) {
          this.router.navigate(['products', error.error._id]);
        }
        break;
      case 400:
        this.snackBar.open(error.error);
        break;
      case 504:
        this.snackBar.open('SnackBar.Message.Error.ServerNotReachable');
        break;
      case 500:
        this.snackBar.open('SnackBar.Message.Error.ServerError');
        break;
      default:
        console.error(error);
        this.snackBar.open('SnackBar.Message.Error.ClientError');
    }
    return of(actions).pipe(switchMap(a => a));
  }

}
