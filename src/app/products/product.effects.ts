import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  AddProductFail,
  AddProductRequest,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductRequest,
  InitProduct,
  InitProductFail,
  InitProductRequest,
  LoadProducts,
  LoadProductsFail,
  LoadProductsRequest,
  MarkProductRead,
  MarkProductReadFail,
  MarkProductReadRequest,
  ProductActionTypes
} from './product.actions';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Logout } from '../auth/auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';
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
    ofType(ProductActionTypes.InitProductRequest),
    mergeMap((action: InitProductRequest) =>
      this.http.post<Product>('/api/products/init', action.payload).pipe(
        map(product => new InitProduct({product})),
        catchError(err => this.handleError(err, new InitProductFail()))
      ))
  );

  @Effect() update$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.AddProductRequest),
    mergeMap((action: AddProductRequest) => {
      return this.http.post<Product>(`/api/products`, action.payload).pipe(
        map(product => new InitProduct({product})),
        catchError(err => this.handleError(err, new AddProductFail()))
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

  @Effect() markRead$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.MarkProductReadRequest),
    mergeMap((action: MarkProductReadRequest) => {
      const id: string = action.payload.id;
      return this.http.post<string>(`/api/products/${id}/markread`, {}).pipe(
        mergeMap(() => [
          new MarkProductRead({id})
        ]),
        catchError(err => this.handleError(err, new MarkProductReadFail()))
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
        this.snackBar.open('SnackBar.Message.Error.ProductNotFound');
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
