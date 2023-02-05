import { IProductCategory } from '../../../entities/product-category/IProductCategory';
import { ProductCategoryCreateRequest } from '../../../entities/product-category/dtos/ProductCategoryCreateRequest';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';

export class CreateProductCategoryUseCases {

  constructor(
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute({ name }: ProductCategoryCreateRequest): Promise<IProductCategory> {
    if(!name) {
      throw new RequiredFieldsError('Nome da categoria');
    }

    const productCategory = await this.productCategoriesRepository.create({ name });

    return productCategory;
  }

}
