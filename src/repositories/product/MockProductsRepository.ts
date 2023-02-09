import { IProductCategory } from '../../entities/product-category/IProductCategory';
import { IProduct } from '../../entities/product/IProduct';
import { ProductCreateRequest } from '../../entities/product/dtos/ProductCreateRequest';
import { ProductUpdateRequest } from '../../entities/product/dtos/ProductUpdateRequest';
import { uuidProvider } from '../../providers/UUID';
import { IProductsRepository } from './IProductsRepository';

export class MockProductsRepository implements IProductsRepository {

  private products: IProduct[] = [];

  async listAll(): Promise<IProduct[]> {
    return [...this.products];
  }

  async listById(id: string): Promise<IProduct> {
    return this.products.find(product => product.id === id);
  }

  async listByCategoryId(categoryId: string): Promise<IProduct[]> {
    return this.products.filter(product => product.category.id === categoryId);
  }

  async create({ name, description, price, categoryId }: ProductCreateRequest): Promise<IProduct> {
    const id = uuidProvider.generateCUID();

    const category: IProductCategory = {
      id: categoryId,
      name: 'fake-category',
    };

    const product: IProduct = {
      id, name, description, price, rated: 0, category,
    };

    this.products.push(product);

    return product;
  }

  async update(id: string, { name, description, rated, price, categoryId }: ProductUpdateRequest): Promise<IProduct> {
    let productUpdated: IProduct;

    const category: IProductCategory = {
      id: categoryId,
      name: 'fake-category',
    };

    this.products = this.products.map(product => {
      if(product.id === id) {
        return productUpdated = {
          id, name, description, rated, price, category,
        };
      }

      return product;
    });

    return productUpdated;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(product => product.id !== id);
  }

  cleanRepository(): void {
    this.products = [];
  }

}
