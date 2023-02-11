import { IShoppingCartProduct } from '../../entities/shopping-cart-product/IShoppingCartProduct';
import { ShoppingCartProductUpdateRequest } from '../../entities/shopping-cart-product/dtos/ShoppingCartProductUpdateRequest';
import { IShoppingCart } from '../../entities/shopping-cart/IShoppingCart';

export interface IShoppingCartsRepository {

  listAll(): Promise<IShoppingCart[]>;

  listByUserId(userId: string): Promise<IShoppingCart | null>;

  listShoppingCartProduct(userId: string, productId: string): Promise<IShoppingCartProduct | null>;

  create(userId: string): Promise<IShoppingCart>;

  addProduct(userId: string, productId: string): Promise<IShoppingCartProduct>;

  updateProduct(userId: string, productId: string, { quantity }: ShoppingCartProductUpdateRequest): Promise<IShoppingCartProduct>;

  removeProducts(userId: string, productsId: string[]): Promise<void>;

  removeAllProducts(userId: string): Promise<void>;

  cleanRepository(): void;

}
