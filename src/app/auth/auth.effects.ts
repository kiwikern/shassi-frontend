import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, LoginRequest, LoginSuccess, LogoutSuccess, RegisterRequest, RegisterSuccess } from './auth.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { ClearProducts, LoadProductsRequest } from '../products/product.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private snackBar: InfoSnackBarService) {
  }

  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REQUEST),
    mergeMap((action: LoginRequest) =>
      this.http.post<{ jwt: string }>('/api/user/login', action.payload).pipe(
        mergeMap(data => this.login(data)),
        catchError(err => this.handleError(err))
      ))
  );

  @Effect() register$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_REQUEST),
    mergeMap((action: RegisterRequest) =>
      this.http.post<{ jwt: string }>('/api/user', action.payload).pipe(
        mergeMap(data => [
          new RegisterSuccess(),
          new LoginRequest(action.payload)
        ]),
        catchError(err => this.handleError(err))
      ))
  );

  @Effect() logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => this.router.navigate(['/auth/login'])),
    mergeMap(() => [
      new ClearProducts(),
      new LogoutSuccess()
    ])
  );

  private handleError(error) {
    switch (error.status) {
      case 401:
        this.snackBar.open('SnackBar.Message.Error.WrongPassword');
        break;
      case 404:
        this.snackBar.open('SnackBar.Message.Error.UnknownUser');
        break;
      case 0:
        this.snackBar.open('SnackBar.Message.Error.NoInternetConnection');
        break;
      case 500:
        this.snackBar.open('SnackBar.Message.Error.ServerError');
        break;
      case 504:
        this.snackBar.open('SnackBar.Message.Error.ServerNotReachable');
        break;
      default:
        this.snackBar.open('SnackBar.Message.Error.ClientError');
        console.error(error);
    }
    return of({type: AuthActionTypes.LOGIN_FAIL});
  }

  private login(data: { jwt: string }) {
    this.router.navigate(['/products']);
    return [
      new LoginSuccess(data),
      new LoadProductsRequest()
    ];
  }

}
