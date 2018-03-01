import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IAuthState } from '../auth/auth.reducer';

export interface IAppState {
}

export const reducers: ActionReducerMap<IAppState> = {

};


export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
