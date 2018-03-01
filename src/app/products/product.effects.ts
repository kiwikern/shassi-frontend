import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { LoadProducts, LoadProductsFailed, ProductActionTypes, RequestLoadProducts } from './product.actions';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Logout } from '../auth/auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }

  @Effect() load$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.LoadProductsRequest),
    mergeMap((action: RequestLoadProducts) =>
      this.http.get<Product[]>('/api/products').pipe(
        map(products => new LoadProducts({products})),
        catchError(err => this.handleError(err, new LoadProductsFailed()))
      ))
  );

  private handleError(error: HttpErrorResponse, action): Observable<any> {
    const actions = [action];
    switch (error.status) {
      case 0:
        console.log('SnackBar.Message.Error.NoInternetConnection');
        break;
      case 401:
        console.log('SnackBar.Message.Error.LoginNeeded');
        actions.push(new Logout());
        break;
      case 404:
        console.log('SnackBar.Message.Error.NoFileFoundForEdit');
        // actions.push(new RequestLoadProducts());
        break;
      case 409:
        console.log('SnackBar.Message.Error.FileAlreadyExists');
        break;
      case 400:
        console.log(error.error);
        break;
      case 504:
        console.log('SnackBar.Message.Error.ServerNotReachable');
        break;
      case 500:
        console.log('SnackBar.Message.Error.ServerError');
        break;
      default:
        console.log(error);
        console.log('SnackBar.Message.Error.ClientError');
    }
    return of(actions).pipe(switchMap(a => a));
  }

}
