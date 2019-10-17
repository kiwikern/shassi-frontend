import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from './user.model';

export interface IAuthState {
  jwt: string;
  user?: User;
  isLoading: boolean;
}

const persistedJwt = localStorage.getItem('shassi.jwt');
export const initialState: IAuthState = {
  jwt: persistedJwt,
  isLoading: false,
};

export function reducer(state = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      const jwt = action.payload.jwt;
      const user = action.payload.user;
      localStorage.setItem('shassi.jwt', jwt);
      localStorage.setItem('shassi.hasAccount', 'true');
      return {jwt, user, isLoading: false};
    case AuthActionTypes.GET_USER_REQUEST:
    case AuthActionTypes.UPDATE_USER_REQUEST:
    case AuthActionTypes.TELEGRAM_LOGIN_REQUEST:
      state = Object.assign({}, state, {isLoading: true});
      return state;
    case AuthActionTypes.GET_USER_SUCCESS:
      state = Object.assign({}, state, action.payload, {isLoading: false});
      return state;
    case AuthActionTypes.UPDATE_USER_SUCCESS:
      state = Object.assign({}, state, action.payload, {isLoading: false});
      return state;
    case AuthActionTypes.GET_USER_FAIL:
    case AuthActionTypes.UPDATE_USER_FAIL:
    case AuthActionTypes.LOGIN_FAIL:
      state = Object.assign({}, state, {isLoading: false});
      return state;
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('shassi.jwt');
      return {jwt: null, isLoading: false};
    default:
      return state;
  }
}

export const authSelector = createFeatureSelector<IAuthState>('auth');
export const selectJwt = createSelector(authSelector, (state: IAuthState) => state.jwt);
export const selectUser = createSelector(authSelector, (state: IAuthState) => state.user);
export const selectIsLoading = createSelector(authSelector, (state: IAuthState) => state.isLoading);
