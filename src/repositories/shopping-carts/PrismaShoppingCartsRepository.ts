import { prisma } from '../../database';
import { IShoppingCart } from '../../entities/shopping-cart/IShoppingCart';
import { ShoppingCartAddOrRemoveProductRequest } from '../../entities/shopping-cart/dtos/ShoppingCartAddProductRequest';
import { IShoppingCartsRepository } from './IShoppingCartsRepository';

export class PrismaShoppingCartsRepository implements IShoppingCartsRepository {

  listAll(): Promise<IShoppingCart[]> {
    return prisma.shoppingCart.findMany({
      include: {
        ShoppingCartProduct: {
          include: {
            product: {
              include: {
                category: true,
              }
            },
          }
        },
      },
    });
  }

  listById(id: string): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }

  listByUserId(userId: string): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }

  addProduct(id: string, { productId }: ShoppingCartAddOrRemoveProductRequest): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }

  removeProduct(id: string, { productId }: ShoppingCartAddOrRemoveProductRequest): Promise<IShoppingCart> {
    throw new Error('Method not implemented.');
  }

  cleanRepository(): void {}

}
