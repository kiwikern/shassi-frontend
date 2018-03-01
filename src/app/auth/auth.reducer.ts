import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface IAuthState {

}

export const initialState: IAuthState = {

};

export function reducer(state = initialState, action: AuthActions): IAuthState {
  switch (action.type) {

    case AuthActionTypes.AuthAction:
      return state;


    default:
      return state;
  }
}
