import { IProductCategory } from '../../entities/product-category/IProductCategory';
import { ProductCategoryCreateRequest } from '../../entities/product-category/dtos/ProductCategoryCreateRequest';

export interface IProductCategoriesRepository {

  listAll(): Promise<IProductCategory[]>;

  listById(id: string): Promise<IProductCategory | null>;

  create({ name }: ProductCategoryCreateRequest): Promise<IProductCategory>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
