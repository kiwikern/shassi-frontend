import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IAuthState, reducer as authReducer } from '../auth/auth.reducer';
import { ProductState, reducer as productsReducer } from '../products/product.reducer';

export interface IAppState {
  auth: IAuthState;
  products: ProductState;
}

export const reducers: ActionReducerMap<IAppState> = {
  auth: authReducer,
  products: productsReducer,
};


export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
