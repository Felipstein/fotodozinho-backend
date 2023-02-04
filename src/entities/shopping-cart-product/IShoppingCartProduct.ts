import { IProduct } from '../product/IProduct';

export interface IShoppingCartProduct {
  id: string;
  product: IProduct;
  quantity: number;
}
