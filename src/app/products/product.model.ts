export interface Size {
  name: string;
  id: string;
  isAvailable?: boolean;
  createdAt?: Date;
}

export interface Update {
  price: number;
  isAvailable: boolean;
}

export interface Product {
  url: string;
  store: string;
  _id?: string;
  name?: string;
  price?: number;
  size?: Size;
  sizes?: Size[];
  updates?: Update[];
  latestUpdate?: Update;
  isActive?: boolean;
  createdAt?: Date;
}
