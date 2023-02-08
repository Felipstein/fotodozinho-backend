import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';

export class DeleteProductUseCases {

  constructor(
    private productsRepository: IProductsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const productExists = await this.productsRepository.listById(id);
    if(!productExists) {
      throw new ProductNotFoundError();
    }

    await this.productsRepository.delete(id);
  }

}
