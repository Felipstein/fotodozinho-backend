import { IProduct } from '../../../entities/product/IProduct';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';

export class ListProductByIdUseCases {

  constructor(
    private productsRepository: IProductsRepository,
  ) { }

  async execute(id: string): Promise<IProduct> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const product = await this.productsRepository.listById(id);
    if(!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }

}
