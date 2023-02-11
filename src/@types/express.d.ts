import { IShoppingCart } from '../entities/shopping-cart/IShoppingCart';

declare global {
  namespace Express {
    export interface Request {
      shoppingCart: IShoppingCart;
    }

  }
}
