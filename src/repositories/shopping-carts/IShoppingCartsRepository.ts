import { IShoppingCart } from '../../entities/shopping-cart/IShoppingCart';
import { ShoppingCartAddOrRemoveProductRequest } from '../../entities/shopping-cart/dtos/ShoppingCartAddProductRequest';

export interface IShoppingCartsRepository {

  listAll(): Promise<IShoppingCart[]>;

  listById(id: string): Promise<IShoppingCart | null>;

  listByUserId(userId: string): Promise<IShoppingCart | null>;

  addProduct(id: string, { productId }: ShoppingCartAddOrRemoveProductRequest): Promise<IShoppingCart>;

  removeProduct(id: string, { productId }: ShoppingCartAddOrRemoveProductRequest): Promise<IShoppingCart>;

  cleanRepository(): void;

}
