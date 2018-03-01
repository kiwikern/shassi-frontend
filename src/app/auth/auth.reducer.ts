import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface IAuthState {
  jwt: string;
}

const persistedJwt = localStorage.getItem('shassi.jwt');
export const initialState: IAuthState = {
  jwt: persistedJwt
};

export function reducer(state = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCESS:
      const jwt = (<{payload}>action).payload.jwt;
      localStorage.setItem('shassi.jwt', jwt);
      return {jwt};
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('shassi.jwt');
      return {jwt: null};
    default:
      return state;
  }
}

export const authSelector = createFeatureSelector<IAuthState>('auth');
export const selectJwt = createSelector(authSelector, (state: IAuthState) => state.jwt);
