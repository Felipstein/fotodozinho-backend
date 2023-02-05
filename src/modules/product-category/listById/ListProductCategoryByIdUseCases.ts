import { IProductCategory } from '../../../entities/product-category/IProductCategory';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';

export class ListProductCategoryByIdUseCases {

  constructor(
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute(id: string): Promise<IProductCategory> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const productCategory = await this.productCategoriesRepository.listById(id);

    if(!productCategory) {
      throw new ProductCategoryNotFoundError();
    }

    return productCategory;
  }

}
