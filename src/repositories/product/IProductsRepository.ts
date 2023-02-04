import { IProduct } from '../../entities/product/IProduct';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';
import { ProductUpdateRequest } from '../../entities/product/dtos/ProductUpdateRequest';

export interface IProductsRepository {

  listAll(): Promise<IProduct[]>;

  listById(id: string): Promise<IProduct | null>;

  listByCategoryId(categoryId: string): Promise<IProduct[]>;

  create({ name, description, price, categoryId }: ProductCreateRequest): Promise<IProduct>;

  update({ name, description, rated, price, categoryId }: ProductUpdateRequest): Promise<IProduct>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
