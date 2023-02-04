import { IProductCategory } from '../../entities/product-category/IProductCategory';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';

export interface IProductCategoriesRepository {

  listAll(): Promise<IProductCategory[]>;

  listById(id: string): Promise<IProductCategory | null>;

  create({ name, price, description, categoryId }: ProductCreateRequest): Promise<IProductCategory>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
