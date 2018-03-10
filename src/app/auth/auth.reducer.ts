import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from './user.model';

export interface IAuthState {
  jwt: string;
  user?: User;
}

const persistedJwt = localStorage.getItem('shassi.jwt');
export const initialState: IAuthState = {
  jwt: persistedJwt,
};

export function reducer(state = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      const jwt = action.payload.jwt;
      const user = action.payload.user;
      localStorage.setItem('shassi.jwt', jwt);
      return {jwt, user};
    case AuthActionTypes.GET_USER_SUCCESS:
      state = Object.assign({}, state, action.payload);
      return state;
    case AuthActionTypes.UPDATE_USER_SUCCESS:
      state = Object.assign({}, state, action.payload);
      return state;
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('shassi.jwt');
      return {jwt: null};
    default:
      return state;
  }
}

export const authSelector = createFeatureSelector<IAuthState>('auth');
export const selectJwt = createSelector(authSelector, (state: IAuthState) => state.jwt);
export const selectUser = createSelector(authSelector, (state: IAuthState) => state.user);
