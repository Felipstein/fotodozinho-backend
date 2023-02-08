import { IProduct } from '../../../entities/product/IProduct';
import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { IProductCategoriesRepository } from '../../../repositories/product-categories/IProductCategoriesRepository';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';

export class ListProductsUseCases {

  constructor(
    private productsRepository: IProductsRepository,
    private productCategoriesRepository: IProductCategoriesRepository,
  ) { }

  async execute(categoryId?: string): Promise<IProduct[]> {
    if(!categoryId) {
      const products = await this.productsRepository.listAll();

      return products;
    }

    const categoryExists = await this.productCategoriesRepository.listById(categoryId);
    if(!categoryExists) {
      throw new ProductCategoryNotFoundError();
    }

    const products = await this.productsRepository.listByCategoryId(categoryId);

    return products;
  }

}
