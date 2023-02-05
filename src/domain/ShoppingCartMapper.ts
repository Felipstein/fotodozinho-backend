import { Product, ProductCategory, ShoppingCart, ShoppingCartProduct } from '@prisma/client';
import { IShoppingCart } from '../entities/shopping-cart/IShoppingCart';
import { shoppingCartProductMapper } from './ShoppingCartProductMapper';

type ProductWithCategory = Product & { category: ProductCategory };
type ShoppingCartProductWithProduct = ShoppingCartProduct & { product: ProductWithCategory };

type ShoppingCartDomain = IShoppingCart;
type ShoppingCartPersistence = ShoppingCart & { ShoppingCartProduct: ShoppingCartProductWithProduct[] };

class ShoppingCartMapper {

  toDomain(shoppingCartPersistence: ShoppingCartPersistence): ShoppingCartDomain {
    return {
      id: shoppingCartPersistence.id,
      userId: shoppingCartPersistence.userId,
      products: shoppingCartPersistence.ShoppingCartProduct.map(shoppingCartProductMapper.toDomain),
    };
  }

}

const shoppingCartMapper = new ShoppingCartMapper();

export { shoppingCartMapper };
