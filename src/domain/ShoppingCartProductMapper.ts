import { Product, ProductCategory, ShoppingCartProduct } from '@prisma/client';
import { IShoppingCartProduct } from '../entities/shopping-cart-product/IShoppingCartProduct';
import { productMapper } from './ProductMapper';

type ProductWithCategory = Product & { category: ProductCategory };

type ShoppingCartProductDomain = IShoppingCartProduct;
type ShoppingCartProductPersistence = ShoppingCartProduct & { product: ProductWithCategory };

class ShoppingCartProductMapper {

  toDomain(shoppingCartProductPersistence: ShoppingCartProductPersistence): ShoppingCartProductDomain {
    return {
      id: shoppingCartProductPersistence.id,
      quantity: Number(shoppingCartProductPersistence.quantity),
      product: productMapper.toDomain(shoppingCartProductPersistence.product),
    };
  }

}

const shoppingCartProductMapper = new ShoppingCartProductMapper();

export { shoppingCartProductMapper };
