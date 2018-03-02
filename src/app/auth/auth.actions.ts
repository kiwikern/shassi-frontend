import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] LOGIN REQUEST',
  LOGIN_SUCESS = '[Auth] LOGIN SUCESS',
  LOGIN_FAIL = '[Auth] LOGIN FAIL',
  REGISTER_REQUEST = '[Auth] REGISTER REQUEST',
  REGISTER_SUCESS = '[Auth] REGISTER SUCESS',
  REGISTER_FAIL = '[Auth] REGISTER FAIL',
  LOGOUT = '[Auth] LOGOUT',
  LOGOUT_SUCCESS = '[Auth] LOGOUT SUCCESS'
}

export class LoginRequest implements Action {
  readonly type = AuthActionTypes.LOGIN_REQUEST;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCESS;

  constructor(public payload: { jwt: string }) {
  }
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;

  constructor() {
  }
}

export class RegisterRequest implements Action {
  readonly type = AuthActionTypes.REGISTER_REQUEST;

  constructor(public payload: { username: string, password: string, email: string }) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCESS;

  constructor() {
  }
}

export class RegisterFail implements Action {
  readonly type = AuthActionTypes.REGISTER_FAIL;

  constructor() {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;

  constructor() {
  }
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;

  constructor() {
  }
}

export type AuthActions =
  LoginFail | LoginRequest | LoginSuccess |
  RegisterRequest | RegisterFail | RegisterSuccess |
  Logout;
