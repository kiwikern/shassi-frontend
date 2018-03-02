import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product, Size } from './product.model';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadProductsRequest = '[Product] Request Load Products',
  LoadProductsFailed = '[Product] Load Products Failed',
  AddProductRequest = '[Product] Add Product Request',
  AddProductFail = '[Product] Add Product Failed',
  AddProduct = '[Product] Add Product',
  UpdateProduct = '[Product] Update Product',
  UpdateProductRequest = '[Product] Update Product Request',
  UpdateProductFail = '[Product] Update Product Fail',
  UpdateProducts = '[Product] Update Products',
  DeleteProduct = '[Product] Delete Product',
  DeleteProducts = '[Product] Delete Products',
}

export class RequestLoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProductsRequest;

  constructor() {
  }
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;

  constructor(public payload: { products: Product[] }) {
  }
}

export class LoadProductsFailed implements Action {
  readonly type = ProductActionTypes.LoadProductsFailed;

  constructor() {
  }
}

export class AddProductRequest implements Action {
  readonly type = ProductActionTypes.AddProductRequest;

  constructor(public payload: { product: Product }) {
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

export class DeleteProducts implements Action {
  readonly type = ProductActionTypes.DeleteProducts;

  constructor(public payload: { ids: string[] }) {
  }
}

export type ProductActions =
  LoadProducts
  | AddProduct | AddProductRequest | AddProductFail
  | UpdateProduct | UpdateProductRequest | UpdateProductFail
  | UpdateProducts
  | DeleteProduct
  | DeleteProducts;
