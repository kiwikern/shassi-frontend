import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from './product.model';
import { ProductActions, ProductActionTypes } from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  isSaving: boolean;
  hasSavingError;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product._id
});

export const initialState: ProductState = adapter.getInitialState({
  // additional entity state properties
  isSaving: false,
  hasSavingError: false
});

export function reducer(state = initialState,
                        action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.AddProduct: {
      state = Object.assign({}, state, {hasSavingError: false, isSaving: false});
      return adapter.addOne(action.payload.product, state);
    }

    case ProductActionTypes.AddProductRequest: {
      state = Object.assign({}, state, {hasSavingError: false, isSaving: true});
      return state;
    }

    case ProductActionTypes.AddProductFail: {
      state = Object.assign({}, state, {hasSavingError: true, isSaving: false});
      return state;
    }

    case ProductActionTypes.UpdateProduct: {
      state = Object.assign({}, state, {hasSavingError: false, isSaving: false});
      return adapter.updateOne(action.payload.product, state);
    }

    case ProductActionTypes.UpdateProductRequest: {
      state = Object.assign({}, state, {hasSavingError: false, isSaving: true});
      return state;
    }

    case ProductActionTypes.UpdateProductFail: {
      state = Object.assign({}, state, {hasSavingError: true, isSaving: false});
      return state;
    }

    case ProductActionTypes.DeleteProduct: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ProductActionTypes.DeleteProducts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ProductActionTypes.LoadProducts: {
      return adapter.addAll(action.payload.products, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectProducts = createFeatureSelector<ProductState>('products');
export const selectAllProducts = createSelector(selectProducts, selectAll);
export const selectProductEntities = createSelector(selectProducts, selectEntities);
export const selectProductById = id => createSelector(selectProductEntities, (store: Dictionary<Product>) => store[id]);
export const selectProductByUrl = url => createSelector(selectAllProducts, (store: Product[]) => store.find(p => p.url === url));

export const selectIsSaving = createSelector(selectProducts, state => state.isSaving);
export const selectHasSavingError = createSelector(selectProducts, state => state.hasSavingError);
