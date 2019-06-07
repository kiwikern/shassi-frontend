import { Action } from '@ngrx/store';
import { User } from './user.model';
import { TelegramLoginData } from './telegram-login-data.interface';

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] LOGIN REQUEST',
  TELEGRAM_LOGIN_REQUEST = '[Auth] TELEGRAM LOGIN REQUEST',
  LOGIN_SUCCESS = '[Auth] LOGIN SUCCESS',
  LOGIN_FAIL = '[Auth] LOGIN FAIL',
  REGISTER_REQUEST = '[Auth] REGISTER REQUEST',
  REGISTER_SUCCESS = '[Auth] REGISTER SUCCESS',
  REGISTER_FAIL = '[Auth] REGISTER FAIL',
  LOGOUT = '[Auth] LOGOUT',
  LOGOUT_SUCCESS = '[Auth] LOGOUT SUCCESS',
  GET_USER_REQUEST = '[Auth] GET USER REQUEST',
  GET_USER_SUCCESS = '[Auth] GET USER SUCCESS',
  GET_USER_FAIL = '[Auth] GET USER FAIL',
  UPDATE_USER_REQUEST = '[Auth] UPDATE USER REQUEST',
  UPDATE_USER_SUCCESS = '[Auth] UPDATE USER SUCCESS',
  UPDATE_USER_FAIL = '[Auth] UPDATE USER FAIL',
}

export class LoginRequest implements Action {
  readonly type = AuthActionTypes.LOGIN_REQUEST;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class TelegramLoginRequest implements Action {
  readonly type = AuthActionTypes.TELEGRAM_LOGIN_REQUEST;

  constructor(public payload: TelegramLoginData) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { jwt: string, user: User }) {
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
  readonly type = AuthActionTypes.REGISTER_SUCCESS;

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

export class GetUserRequest implements Action {
  readonly type = AuthActionTypes.GET_USER_REQUEST;

  constructor() {
  }
}

export class GetUserSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_SUCCESS;

  constructor(public payload: {user: User}) {
  }
}

export class GetUserFail implements Action {
  readonly type = AuthActionTypes.GET_USER_FAIL;

  constructor() {
  }
}

export class UpdateUserRequest implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_REQUEST;

  constructor(public payload: {user: Partial<User>}) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_SUCCESS;

  constructor(public payload: {user: User}) {
  }
}

export class UpdateUserFail implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_FAIL;

  constructor() {
  }
}

export type AuthActions =
  LoginFail | LoginRequest | LoginSuccess |
  RegisterRequest | RegisterFail | RegisterSuccess |
  UpdateUserRequest | UpdateUserFail | UpdateUserSuccess |
  GetUserRequest | GetUserFail | GetUserSuccess |
  Logout;
