import { IShoppingCartProduct } from '../shopping-cart-product/IShoppingCartProduct';

export interface IShoppingCart {
  id: string;
  userId:string;
  products: IShoppingCartProduct[];
}
