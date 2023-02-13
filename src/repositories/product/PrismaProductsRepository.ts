import { prisma } from '../../database';
import { productMapper } from '../../domain/ProductMapper';
import { IProduct } from '../../entities/product/IProduct';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';
import { ProductUpdateRequest } from '../../entities/product/dtos/ProductUpdateRequest';
import { IProductsRepository } from './IProductsRepository';
import { ImageStoragedService } from '../../services/image-storaged-type';

const include = {
  category: true,
};

export class PrismaProductsRepository implements IProductsRepository {

  async listAll(): Promise<IProduct[]> {
    const products = await prisma.product.findMany({ include });

    return products.map(productMapper.toDomain);
  }

  async listByIds(ids: string[]): Promise<IProduct[]> {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        }
      },
      include,
    });

    return products.map(productMapper.toDomain);
  }

  async listById(id: string): Promise<IProduct> {
    const product = await prisma.product.findFirst({
      where: { id },
      include,
    });

    if(!product) {
      return null;
    }

    return productMapper.toDomain(product);
  }

  async listByCategoryId(categoryId: string): Promise<IProduct[]> {
    const products = await prisma.product.findMany({
      where: { productCategoryId: categoryId },
      include,
    });

    return products.map(productMapper.toDomain);
  }

  async create({ name, description, price, imageName, imageUrl, key, imageStoragedType, categoryId }: ProductCreateRequest): Promise<IProduct> {
    const imageStoragedTypeConverted = ImageStoragedService.convertStorageTypePrismaFormat(imageStoragedType);

    const product = await prisma.product.create({
      data: { name, description, price, imageName, imageUrl, key, imageStoragedType: imageStoragedTypeConverted, productCategoryId: categoryId },
      include,
    });

    return productMapper.toDomain(product);
  }

  async update(id: string, { name, description, rated, price, imageName, imageUrl, key, imageStoragedType, categoryId }: ProductUpdateRequest): Promise<IProduct> {
    const imageStoragedTypeConverted = ImageStoragedService.convertStorageTypePrismaFormat(imageStoragedType);

    const product = await prisma.product.update({
      where: { id },
      data: { name, description, rated, price, imageName, imageUrl, key, productCategoryId: categoryId, imageStoragedType: imageStoragedTypeConverted },
      include,
    });

    return productMapper.toDomain(product);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  cleanRepository(): void {}

}
