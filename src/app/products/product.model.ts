export interface Size {
  name: string;
  id: string;
  isAvailable?: boolean;
  createdAt?: Date;
}

export interface Update {
  price: number;
  isAvailable: boolean;
  createdAt?: Date;
}

export interface Product {
  url: string;
  store: string;
  _id?: string;
  name?: string;
  price?: number;
  isAvailable?: boolean;
  size?: Size;
  sizeName?: string;
  sizes?: Size[];
  updates?: Update[];
  isActive?: boolean;
  createdAt?: Date;
}
