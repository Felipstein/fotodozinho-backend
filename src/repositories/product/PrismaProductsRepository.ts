import { prisma } from '../../database';
import { productMapper } from '../../domain/ProductMapper';
import { IProduct } from '../../entities/product/IProduct';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';
import { ProductUpdateRequest } from '../../entities/product/dtos/ProductUpdateRequest';
import { IProductsRepository } from './IProductsRepository';

const include = {
  category: true,
};

export class PrismaProductsRepository implements IProductsRepository {

  async listAll(): Promise<IProduct[]> {
    const products = await prisma.product.findMany();

    return products.map(productMapper.toDomain);
  }

  async listById(id: string): Promise<IProduct> {
    const product = await prisma.product.findFirst({
      where: { id },
      include,
    });

    return productMapper.toDomain(product);
  }

  async listByCategoryId(categoryId: string): Promise<IProduct[]> {
    const products = await prisma.product.findMany({
      where: { productCategoryId: categoryId },
      include,
    });

    return products.map(productMapper.toDomain);
  }

  async create({ name, description, price, categoryId }: ProductCreateRequest): Promise<IProduct> {
    const product = await prisma.product.create({
      data: { name, description, price, productCategoryId: categoryId },
      include,
    });

    return productMapper.toDomain(product);
  }

  async update(id: string, { name, description, rated, price, categoryId }: ProductUpdateRequest): Promise<IProduct> {
    const product = await prisma.product.update({
      where: { id },
      data: { name, description, rated, price, productCategoryId: categoryId },
      include,
    });

    return productMapper.toDomain(product);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  cleanRepository(): void {}

}
