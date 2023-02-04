import { IShoppingCartProduct } from '../shopping-cart-product/IShoppingCartProduct';
import { IUserView } from '../user/IUserView';

export interface IShoppingCart{
  id: string;
  user: IUserView;
  products: IShoppingCartProduct[];
}
