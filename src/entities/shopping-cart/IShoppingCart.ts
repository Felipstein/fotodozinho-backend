import { IShoppingCartProduct } from '../shopping-cart-product/IShoppingCartProduct';

export interface IShoppingCart {
  id: string;
  products: IShoppingCartProduct[];
}
