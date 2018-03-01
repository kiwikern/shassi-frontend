import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, LoginRequest, RegisterRequest } from './auth.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
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
          {type: AuthActionTypes.REGISTER_SUCESS},
          {type: AuthActionTypes.LOGIN_REQUEST, payload: action.payload}
        ]),
        catchError(err => this.handleError(err))
      ))
  );

  @Effect() logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => this.router.navigate(['/auth/login'])),
    map(() => ({type: AuthActionTypes.LOGOUT_SUCCESS}))
  );

  private handleError(error) {
    console.log(error);
    if (error.status === 401) {
      console.log('SnackBar.Message.Error.WrongPassword');
    } else if (error.status === 0) {
      console.log('SnackBar.Message.Error.NoInternetConnection');
    } else if (error.status === 500) {
      console.log('SnackBar.Message.Error.ServerError');
    } else if (error.status === 504) {
      console.log('SnackBar.Message.Error.ServerNotReachable');
    } else {
      console.log('SnackBar.Message.Error.ClientError');
      console.log(error);
    }
    return of({type: AuthActionTypes.LOGIN_FAIL});
  }

  private login(data: { jwt: string }) {
    this.router.navigate(['/products']);
    return [
      {type: AuthActionTypes.LOGIN_SUCESS, payload: data}
    ];
  }

}
