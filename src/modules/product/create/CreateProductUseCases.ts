import { ProductCreateRequest } from '../../../entities/product/dtos/ProductCreateRequest';
import { convertStorageTypeFormat, IProduct } from '../../../entities/product/IProduct';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';
import EnvProvider from '../../../utils/EnvProvider';
import { someIsNullOrUndefined } from '../../../utils/Validate';

export class CreateProductUseCases {

  constructor(
    private productsRepository: IProductsRepository,
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute({ name, description, price, imageName, imageUrl, key, categoryId }: ProductCreateRequest): Promise<IProduct> {
    if(someIsNullOrUndefined(name, price, categoryId)) {
      throw new RequiredFieldsError('Nome', 'Preço', 'Categoria');
    }

    if(isNaN(price)) {
      throw new NumberValidationError('Preço');
    }

    const categoryExists = await this.productCategoriesRepository.listById(categoryId);
    if(!categoryExists) {
      throw new ProductCategoryNotFoundError();
    }

    const imageStoragedType = convertStorageTypeFormat(EnvProvider.storageType);

    const product = await this.productsRepository.create({
      name, description, price, imageName, imageUrl, key, categoryId, imageStoragedType,
    });

    return product;
  }

}
