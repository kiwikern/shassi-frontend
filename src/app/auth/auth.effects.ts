import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes,
  GetUserFail,
  GetUserRequest,
  GetUserSuccess,
  LoginFail,
  LoginRequest,
  LoginSuccess,
  LogoutSuccess,
  RegisterFail,
  RegisterRequest,
  RegisterSuccess,
  UpdateUserFail,
  UpdateUserRequest,
  UpdateUserSuccess
} from './auth.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { ClearProducts, LoadProductsRequest } from '../products/product.actions';
import { User } from './user.model';

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
      this.http.post<{ jwt: string, user: User }>('/api/auth/login', action.payload).pipe(
        mergeMap(data => this.login(data)),
        catchError(err => this.handleError(err, new LoginFail()))
      ))
  );

  @Effect() register$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_REQUEST),
    mergeMap((action: RegisterRequest) =>
      this.http.post<{ jwt: string }>('/api/users', action.payload).pipe(
        mergeMap(data => [
          new RegisterSuccess(),
          new LoginRequest(action.payload)
        ]),
        catchError(err => this.handleError(err, new RegisterFail()))
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

  @Effect() getUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_USER_REQUEST),
    mergeMap((action: GetUserRequest) =>
      this.http.get<User>('/api/users').pipe(
        map(user => new GetUserSuccess({user})),
        catchError(err => this.handleError(err, new GetUserFail()))
      ))
  );

  @Effect() updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.UPDATE_USER_REQUEST),
    mergeMap((action: UpdateUserRequest) =>
      this.http.put<User>('/api/users', action.payload.user).pipe(
        map(user => new UpdateUserSuccess({user})),
        catchError(err => this.handleError(err, new UpdateUserFail()))
      ))
  );

  private handleError(error, action) {
    const actions = [action];
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
    return of(actions).pipe(switchMap(a => a));
  }

  private login(data: { jwt: string, user: User }) {
    this.router.navigate(['/products']);
    console.log(data);
    return [
      new LoginSuccess(data),
      new LoadProductsRequest()
    ];
  }

}
