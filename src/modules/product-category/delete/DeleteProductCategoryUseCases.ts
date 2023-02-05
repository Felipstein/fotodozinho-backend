import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';

export class DeleteProductCategoryUseCases {

  constructor(
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const productCategoryExists = await this.productCategoriesRepository.listById(id);
    if(!productCategoryExists) {
      throw new ProductCategoryNotFoundError();
    }

    await this.productCategoriesRepository.delete(id);
  }

}
