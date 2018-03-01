export interface Product {
  _id?: string;
  url: string;
  store: string;
  size?: {
    name: string;
    id: string;
  };
  updates?: [{
    price: number,
    isAvailable: boolean
  }];
  isActive?: boolean;
}
