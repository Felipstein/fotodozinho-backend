import { IProduct } from '../../../entities/product/IProduct';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';

export class ListProductsUseCases {

  constructor(
    private productsRepository: IProductsRepository,
  ) { }

  async execute(): Promise<IProduct[]> {
    const products = await this.productsRepository.listAll();

    return products;
  }

}
