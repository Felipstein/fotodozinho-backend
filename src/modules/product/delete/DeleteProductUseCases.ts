import { s3ClientService } from '../../../config/multer.config';
import { ConflictRequestError } from '../../../errors/ConflictRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';
import { EnvProvider } from '../../../services/env-provider';
import { ImageDeleteService } from '../../../services/image-delete';
import { LocalFileManagerService } from '../../../services/local-image-manager';
export class DeleteProductUseCases {

  constructor(
    private productsRepository: IProductsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const product = await this.productsRepository.listById(id);
    if(!product) {
      throw new ProductNotFoundError();
    }

    const storagedType = product.imageStoragedType;

    try {
      await ImageDeleteService.deleteImage(product.key, storagedType);
    } catch (err: any) {
      throw new ConflictRequestError('Houve um problema na deleção da imagem do produto, porém, o produto foi removido do banco de dados');
    }

    await this.productsRepository.delete(id);
  }

}
