import { prisma } from '../../database';
import { shoppingCartMapper } from '../../domain/ShoppingCartMapper';
import { shoppingCartProductMapper } from '../../domain/ShoppingCartProductMapper';
import { IShoppingCartProduct } from '../../entities/shopping-cart-product/IShoppingCartProduct';
import { ShoppingCartProductUpdateRequest } from '../../entities/shopping-cart-product/dtos/ShoppingCartProductUpdateRequest';
import { IShoppingCart } from '../../entities/shopping-cart/IShoppingCart';
import { IShoppingCartsRepository } from './IShoppingCartsRepository';

const shoppingCartProductInclude = {
  product: {
    include: {
      category: true,
    },
  },
};

const shoppingCartInclude = {
  ShoppingCartProduct: {
    include: shoppingCartProductInclude,
  },
};

export class PrismaShoppingCartsRepository implements IShoppingCartsRepository {

  async listAll(): Promise<IShoppingCart[]> {
    const shoppingCarts = await prisma.shoppingCart.findMany({ include: shoppingCartInclude });

    return shoppingCarts.map(shoppingCartMapper.toDomain);
  }

  async listByUserId(userId: string): Promise<IShoppingCart> {
    const shoppingCart = await prisma.shoppingCart.findFirst({
      where: { userId },
      include: {
        ShoppingCartProduct: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if(!shoppingCart) {
      return null;
    }

    return shoppingCartMapper.toDomain(shoppingCart);
  }

  async listShoppingCartProduct(userId: string, productId: string): Promise<IShoppingCartProduct> {
    const { id: shoppingCartId } = await prisma.shoppingCart.findFirst({
      where: { userId },
    });

    const shoppingCartProduct = await prisma.shoppingCartProduct.findFirst({
      where: { shoppingCartId, productId },
      include: shoppingCartProductInclude,
    });

    if(!shoppingCartProduct) {
      return null;
    }

    return shoppingCartProductMapper.toDomain(shoppingCartProduct);
  }

  async create(userId: string): Promise<IShoppingCart> {
    const shoppingCart = await prisma.shoppingCart.create({
      data: { userId },
      include: shoppingCartInclude,
    });

    return shoppingCartMapper.toDomain(shoppingCart);
  }

  async addProduct(userId: string, productId: string): Promise<IShoppingCartProduct> {
    const { id: shoppingCartId } = await prisma.shoppingCart.findFirst({
      where: { userId },
    });

    const shoppingCartProduct = await prisma.shoppingCartProduct.create({
      data: { shoppingCartId, productId },
      include: shoppingCartProductInclude,
    });

    return shoppingCartProductMapper.toDomain(shoppingCartProduct);
  }

  async updateProduct(userId: string, productId: string, { quantity }: ShoppingCartProductUpdateRequest): Promise<IShoppingCartProduct> {
    const { id: shoppingCartId } = await prisma.shoppingCart.findFirst({
      where: { userId },
    });

    const { id: shoppingCartProductId } = await prisma.shoppingCartProduct.findFirst({
      where: { shoppingCartId, productId },
    });

    const shoppingCartProduct = await prisma.shoppingCartProduct.update({
      where: { id: shoppingCartProductId },
      data: { quantity },
      include: shoppingCartProductInclude,
    });

    return shoppingCartProductMapper.toDomain(shoppingCartProduct);
  }

  async removeProducts(userId: string, productsId: string[]): Promise<void> {
    const { id: shoppingCartId } = await prisma.shoppingCart.findFirst({
      where: { userId },
    });

    await prisma.shoppingCartProduct.deleteMany({
      where: {
        shoppingCartId,
        productId: {
          in: productsId,
        }
      }
    });
  }

  async removeAllProducts(userId: string): Promise<void> {
    const { id: shoppingCartId } = await prisma.shoppingCart.findFirst({
      where: { userId },
    });

    await prisma.shoppingCartProduct.deleteMany({
      where: { shoppingCartId },
    });
  }

  cleanRepository(): void {}

}
