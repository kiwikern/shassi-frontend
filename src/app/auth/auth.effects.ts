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
  TelegramLoginRequest,
  UpdateUserFail,
  UpdateUserRequest,
  UpdateUserSuccess
} from './auth.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { ClearProducts, LoadProductsRequest } from '../products/product.actions';
import { User } from './user.model';
import { TelegramService } from './telegram.service';

@Injectable()
export class AuthEffects {
  private queryParams: Params;

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: InfoSnackBarService,
              private telegramService: TelegramService) {
    this.route.queryParams.subscribe(params => this.queryParams = params);
  }

  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REQUEST),
    mergeMap((action: LoginRequest) =>
      this.http.post<{ jwt: string, user: User }>('/api/auth/login', action.payload).pipe(
        mergeMap(data => this.login(data)),
        catchError(err => this.handleError(err, new LoginFail()))
      ))
  );

  @Effect() telegramLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.TELEGRAM_LOGIN_REQUEST),
    mergeMap((action: TelegramLoginRequest) =>
      this.http.post<{ jwt: string, user: User }>('/api/telegram/login', action.payload).pipe(
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
    mergeMap((action: GetUserRequest) => {
      const getUsers$ = this.http.get<User>('/api/users');
      return combineLatest([getUsers$, this.telegramService.isConnectedToTelegram()]).pipe(
        map(([user, isConnectedToTelegram]) => new GetUserSuccess({user: {...user, isConnectedToTelegram}})),
        catchError(err => this.handleError(err, new GetUserFail()))
      );
    })
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
    console.log(error);
    switch (error.status) {
      case 401:
        if (error.error && error.error.key && error.error.key.startsWith('telegram')) {
          this.snackBar.open('SnackBar.Message.Error.' + error.error.key,
            'SnackBar.Action.OK', 15000);
          this.router.navigate(['/']);
        } else {
          this.snackBar.open('SnackBar.Message.Error.WrongPassword');
        }
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
      case 400:
        switch (error.error.error) {
          case 'username_already_exists':
            this.snackBar.open('SnackBar.Message.Error.UsernameAlreadyExists');
            break;
          case 'login-via-telegram-only':
            this.snackBar.open('SnackBar.Message.Error.OnlyTelegramLoginPossible');
            break;
          default:
            this.snackBar.open('SnackBar.Message.Error.ClientError');
            console.error(error);
        }
        break;
      default:
        this.snackBar.open('SnackBar.Message.Error.ClientError');
        console.error(error);
    }
    return of(actions).pipe(switchMap(a => a));
  }

  private login(data: { jwt: string, user: User }) {
    if (this.queryParams && this.queryParams.redirectTo) {
      this.router.navigateByUrl(this.queryParams.redirectTo);
    } else {
      this.router.navigate(['/products'], {queryParamsHandling: 'merge'});
    }
    return [
      new LoginSuccess(data),
      new LoadProductsRequest()
    ];
  }

}
