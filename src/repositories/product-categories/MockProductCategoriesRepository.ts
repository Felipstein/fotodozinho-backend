import { IProductCategory } from '../../entities/product-category/IProductCategory';
import { ProductCategoryCreateRequest } from '../../entities/product-category/dtos/ProductCategoryCreateRequest';
import { uuidProvider } from '../../providers/UUID';
import { IProductCategoriesRepository } from './IProductCategoriesRepository';

export class MockProductCategoriesRepository implements IProductCategoriesRepository {

  private productCategories: IProductCategory[] = [];

  async listAll(): Promise<IProductCategory[]> {
    return [...this.productCategories];
  }

  async listById(id: string): Promise<IProductCategory> {
    return this.productCategories.find(productCategory => productCategory.id === id);
  }

  async create({ name }: ProductCategoryCreateRequest): Promise<IProductCategory> {
    const id = uuidProvider.generateCUID();

    const productCategory: IProductCategory = {
      id, name,
    };

    this.productCategories.push(productCategory);

    return productCategory;
  }

  async delete(id: string): Promise<void> {
    this.productCategories = this.productCategories.filter(productCategory => productCategory.id !== id);
  }

  cleanRepository(): void {
    this.productCategories = [];
  }

}
