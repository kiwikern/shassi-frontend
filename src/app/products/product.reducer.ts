import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product, Size } from './product.model';
import { ProductActions, ProductActionTypes } from './product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';
import { FilterOptions } from './filter-options.interface';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  isSaving: boolean;
  hasSavingError: boolean;
  isLoading: boolean;
  filteredStores: string[];
  filteredName: string;
  filterOptions: FilterOptions;
  initProduct?: { url: string, sizes: Size[], name: string };
  latestProductId?: string;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product._id
});

export const initialState: ProductState = adapter.getInitialState({
  // additional entity state properties
  isSaving: false,
  hasSavingError: false,
  isLoading: false,
  filteredStores: [],
  filteredName: '',
  filterOptions: {showOnlyAvailable: false, showOnlyWithUnreadUpdate: false, showOnlyLowInStock: false}
});

export function reducer(state = initialState,
                        action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.InitProduct: {
      state = Object.assign({}, state, {hasSavingError: false, isSaving: false, initProduct: action.payload.product});
      return state;
    }

    case ProductActionTypes.InitProductRequest: {
      state = Object.assign({}, state, {hasSavingError: false, isSaving: true});
      return state;
    }

    case ProductActionTypes.InitProductFail: {
      state = Object.assign({}, state, {hasSavingError: true, isSaving: false});
      return state;
    }

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

    case ProductActionTypes.MarkProductRead: {
      state = Object.assign({}, state, {hasSavingError: true, isSaving: false});
      return adapter.updateOne({id: action.payload.id, changes: {hasUnreadUpdate: false}}, state);
    }

    case ProductActionTypes.DeleteProduct: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ProductActionTypes.DeleteProducts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ProductActionTypes.LoadProductsRequest: {
      return Object.assign({}, state, {isLoading: true});
    }

    case ProductActionTypes.LoadProductsFail: {
      return Object.assign({}, state, {isLoading: false});
    }

    case ProductActionTypes.LoadProducts: {
      state = Object.assign({}, state, {isLoading: false});
      return adapter.addAll(action.payload.products, state);
    }

    case ProductActionTypes.ClearProducts: {
      return adapter.removeAll(state);
    }

    case ProductActionTypes.UpdateFilteredStores: {
      state = Object.assign({}, state, {filteredStores: action.payload.stores});
      return state;
    }

    case ProductActionTypes.UpdateFilteredName: {
      state = Object.assign({}, state, {filteredName: action.payload.name});
      return state;
    }

    case ProductActionTypes.UpdateFilterOptions: {
      const filterOptions = Object.assign({}, state.filterOptions, action.payload.options);
      state = Object.assign({}, state, {filterOptions});
      return state;
    }

    case ProductActionTypes.SetLatestProductId: {
      state = Object.assign({}, state, {latestProductId: action.payload.latestProductId});
      return state;
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
export const selectInitProduct = createSelector(selectProducts, (store: ProductState) => store.initProduct);

// Filter selectors
export const selectAvailableStores = createSelector(selectAllProducts, (store: Product[]) => {
  const stores = store.map(product => product.store)
    .filter(pStore => !!pStore);
  const seen = new Set();
  return stores.filter(s => seen.has(s) ? false : seen.add(s));
});
export const selectFilteredStores = createSelector(selectProducts, store => store.filteredStores);
export const selectFilteredName = createSelector(selectProducts, store => store.filteredName);
export const selectFilterOptions = createSelector(selectProducts, store => store.filterOptions);

export const selectIsSaving = createSelector(selectProducts, state => state.isSaving);
export const selectIsLoading = createSelector(selectProducts, state => state && state.isLoading);
export const selectHasSavingError = createSelector(selectProducts, state => state.hasSavingError);

export const selectLatestProductId = createSelector(selectProducts, state => state.latestProductId);
