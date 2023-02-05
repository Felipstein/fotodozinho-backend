import { IProductCategory } from '../../../entities/product-category/IProductCategory';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';

export class ListProductCategoriesUseCases {

  constructor(
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute(): Promise<IProductCategory[]> {
    const productCategories = await this.productCategoriesRepository.listAll();

    return productCategories;
  }

}
