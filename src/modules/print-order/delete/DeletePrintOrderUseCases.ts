import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PartialContentError } from '../../../errors/PartialContentError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { ImageDeleteService } from '../../../services/image-delete';

export class DeletePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private printsRepository: IPrintsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const printOrderExists = await this.printOrdersRepository.listById(id);
    if(!printOrderExists) {
      throw new PrintOrderNotFound();
    }

    const prints = await this.printsRepository.listManyByProperties({ printOrderId: id });

    const imagesKey = prints.map(print => ({ key: print.key, storagedType: print.imageStoragedType }));

    await this.printOrdersRepository.delete(id);

    try {
      await ImageDeleteService.deleteImages(imagesKey);
    } catch(err: any) {
      throw new PartialContentError('O pedido de impressão foi deletado com êxito, mas algumas imagens para a impressão podem não ter sido removidas com o mesmo êxito', err);
    }
  }

}
