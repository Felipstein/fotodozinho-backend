import { prisma } from '../../database';
import { IProductCategory } from '../../entities/product-category/IProductCategory';
import { ProductCategoryCreateRequest } from '../../entities/product-category/dtos/ProductCategoryCreateRequest';
import { IProductCategoriesRepository } from './IProductCategoriesRepository';

export class PrismaProductCategoriesRepository implements IProductCategoriesRepository {

  listAll(): Promise<IProductCategory[]> {
    return prisma.productCategory.findMany();
  }

  listById(id: string): Promise<IProductCategory> {
    return prisma.productCategory.findFirst({ where: { id } });
  }

  create({ name }: ProductCategoryCreateRequest): Promise<IProductCategory> {
    return prisma.productCategory.create({
      data: { name },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.productCategory.delete({ where: { id } });
  }

  cleanRepository(): void {}

}
