import { IProduct } from '../../entities/product/IProduct';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';
import { ProductUpdateRequest } from '../../entities/product/dtos/ProductUpdateRequest';

export interface IProductsRepository {

  listAll(): Promise<IProduct[]>;

  listByIds(ids: string[]): Promise<IProduct[]>;

  listById(id: string): Promise<IProduct | null>;

  listByCategoryId(categoryId: string): Promise<IProduct[]>;

  create({ name, description, price, imageName, imageUrl, key, categoryId, imageStoragedType }: ProductCreateRequest): Promise<IProduct>;

  update(id: string, { name, description, rated, price, imageName, imageUrl, key, categoryId, imageStoragedType }: ProductUpdateRequest): Promise<IProduct>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
