/* eslint-disable no-empty */
import { ProductUpdateRequest } from '../../../entities/product/dtos/ProductUpdateRequest';
import { IProduct } from '../../../entities/product/IProduct';
import { BadRequestError } from '../../../errors/BadRequestError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';
import { EnvProvider } from '../../../services/env-provider';
import { ImageDeleteService } from '../../../services/image-delete';
import { ImageStoragedService } from '../../../services/image-storaged-type';
import { ValidateService } from '../../../services/validate';

export class UpdateProductUseCases {

  constructor(
    private productsRepository: IProductsRepository,
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute(id: string, { name, description, price, rated, imageName, imageUrl, key, categoryId }: Omit<ProductUpdateRequest, 'imageStoragedType'>): Promise<IProduct> {
    if(ValidateService.someIsNull(name, price, rated, categoryId)) {
      throw new BadRequestError('Os campos nome, preço, avaliação ou categoria não podem ter valores em branco');
    }

    if(price) {
      if(isNaN(price)) {
        throw new NumberValidationError('Preço');
      }
    }

    const productExists = await this.productsRepository.listById(id);
    if(!productExists) {
      throw new ProductNotFoundError();
    }

    if(categoryId) {
      const categoryExists = await this.productCategoriesRepository.listById(categoryId);
      if(!categoryExists) {
        throw new ProductCategoryNotFoundError();
      }
    }

    const oldImageStoragedType = productExists.imageStoragedType;

    try {
      await ImageDeleteService.deleteImage(productExists.key, oldImageStoragedType);
    } catch {}

    const imageStoragedType = ImageStoragedService.convertStorageTypeFormat(EnvProvider.storageType);

    const product = await this.productsRepository.update(id, {
      name, description, price, rated, imageName, imageUrl, key, categoryId, imageStoragedType,
    });

    return product;
  }

}
