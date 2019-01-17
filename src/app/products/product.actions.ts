import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product, Size } from './product.model';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadProductsRequest = '[Product] Load Products Request',
  LoadProductsFail = '[Product] Load Products Fail',
  InitProductRequest = '[Product] Init Product Request',
  InitProductFail = '[Product] Init Product Failed',
  InitProduct = '[Product] Init Product',
  AddProduct = '[Product] Add Product',
  AddProductRequest = '[Product] Add Product Request',
  AddProductFail = '[Product] Add Product Fail',
  UpdateProducts = '[Product] Update Products',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductRequest = '[Product] Delete Product Request',
  DeleteProductFail = '[Product] Delete Product Fail',
  DeleteProducts = '[Product] Delete Products',
  MarkProductReadRequest = '[Product] Mark Product Read Request',
  MarkProductReadFail = '[Product] Mark Product Read Fail',
  MarkProductRead = '[Product] Mark Product Read',
  ClearProducts = '[Product] Clear Products',
  UpdateFilteredStores = '[Product] Update Filtered Stores',
  UpdateFilteredName = '[Product] Update Filtered Name'
}

export class LoadProductsRequest implements Action {
  readonly type = ProductActionTypes.LoadProductsRequest;

  constructor() {
  }
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;

  constructor(public payload: { products: Product[] }) {
  }
}

export class LoadProductsFail implements Action {
  readonly type = ProductActionTypes.LoadProductsFail;

  constructor() {
  }
}

export class InitProductRequest implements Action {
  readonly type = ProductActionTypes.InitProductRequest;

  constructor(public payload: { url: string }) {
  }
}

export class InitProductFail implements Action {
  readonly type = ProductActionTypes.InitProductFail;

  constructor() {
  }
}

export class InitProduct implements Action {
  readonly type = ProductActionTypes.InitProduct;

  constructor(public payload: { product: Product }) {
  }
}

export class AddProductRequest implements Action {
  readonly type = ProductActionTypes.AddProductRequest;

  constructor(public payload: { url: string, size: Size, name: string }) {
  }
}

export class AddProductFail implements Action {
  readonly type = ProductActionTypes.AddProductFail;

  constructor() {
  }
}

export class AddProduct implements Action {
  readonly type = ProductActionTypes.AddProduct;

  constructor(public payload: { product: Product }) {
  }
}

export class UpdateProducts implements Action {
  readonly type = ProductActionTypes.UpdateProducts;

  constructor(public payload: { products: Update<Product>[] }) {
  }
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteProductRequest implements Action {
  readonly type = ProductActionTypes.DeleteProductRequest;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteProductFail implements Action {
  readonly type = ProductActionTypes.DeleteProductFail;

  constructor() {
  }
}

export class MarkProductRead implements Action {
  readonly type = ProductActionTypes.MarkProductRead;

  constructor(public payload: { id: string }) {
  }
}

export class MarkProductReadRequest implements Action {
  readonly type = ProductActionTypes.MarkProductReadRequest;

  constructor(public payload: { id: string }) {
  }
}

export class MarkProductReadFail implements Action {
  readonly type = ProductActionTypes.MarkProductReadFail;

  constructor() {
  }
}

export class DeleteProducts implements Action {
  readonly type = ProductActionTypes.DeleteProducts;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearProducts implements Action {
  readonly type = ProductActionTypes.ClearProducts;

  constructor() {
  }
}

export class UpdateFilteredName implements Action {
  readonly type = ProductActionTypes.UpdateFilteredName;

  constructor(public payload: { name: string }) {
  }
}

export class UpdateFilteredStores implements Action {
  readonly type = ProductActionTypes.UpdateFilteredStores;

  constructor(public payload: { stores: string[] }) {
  }
}

export type ProductActions =
  LoadProducts | LoadProductsRequest | LoadProductsFail
  | InitProduct | InitProductRequest | InitProductFail
  | AddProduct | AddProductRequest | AddProductFail
  | UpdateProducts
  | DeleteProduct | DeleteProductRequest | DeleteProductFail
  | MarkProductRead | MarkProductReadRequest | MarkProductReadFail
  | DeleteProducts
  | ClearProducts
  | UpdateFilteredName | UpdateFilteredStores;
