import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product, Size } from './product.model';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadProductsRequest = '[Product] Load Products Request',
  LoadProductsFail = '[Product] Load Products Fail',
  AddProductRequest = '[Product] Add Product Request',
  AddProductFail = '[Product] Add Product Failed',
  AddProduct = '[Product] Add Product',
  UpdateProduct = '[Product] Update Product',
  UpdateProductRequest = '[Product] Update Product Request',
  UpdateProductFail = '[Product] Update Product Fail',
  UpdateProducts = '[Product] Update Products',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductRequest = '[Product] Delete Product Request',
  DeleteProductFail = '[Product] Delete Product Fail',
  DeleteProducts = '[Product] Delete Products',
  MarkProductReadRequest = '[Product] Mark Product Read Request',
  MarkProductReadFail = '[Product] Mark Product Read Fail',
  MarkProductRead = '[Product] Mark Product Read',
  ClearProducts = '[Product] Clear Products'
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

export class AddProductRequest implements Action {
  readonly type = ProductActionTypes.AddProductRequest;

  constructor(public payload: { url: string }) {
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

export class UpdateProductRequest implements Action {
  readonly type = ProductActionTypes.UpdateProductRequest;

  constructor(public payload: { _id: string, size: Size, name: string }) {
  }
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;

  constructor() {
  }
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: { product: Update<Product> }) {
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

export type ProductActions =
  LoadProducts | LoadProductsRequest | LoadProductsFail
  | AddProduct | AddProductRequest | AddProductFail
  | UpdateProduct | UpdateProductRequest | UpdateProductFail
  | UpdateProducts
  | DeleteProduct | DeleteProductRequest | DeleteProductFail
  | MarkProductRead | MarkProductReadRequest | MarkProductReadFail
  | DeleteProducts
  | ClearProducts;
