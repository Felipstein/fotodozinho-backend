import { ShoppingCart, ShoppingCartProduct } from '@prisma/client';
import { IShoppingCart } from '../entities/shopping-cart/IShoppingCart';

type ShoppingCartDomain = IShoppingCart;
type ShoppingCartPersistence = ShoppingCart & { ShoppingCartProduct: ShoppingCartProduct[] };

class ShoppingCartMapper {

  toDomain(shoppingCartPersistence: ShoppingCartPersistence): ShoppingCartDomain {
    return {
      id: shoppingCartPersistence.id,
      products: shoppingCartPersistence.ShoppingCartProduct
    };
  }

}

const shoppingCartMapper = new ShoppingCartMapper();

export { shoppingCartMapper };
