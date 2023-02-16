import { ForbiddenError } from '../../../errors/ForbiddenError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PartialContentError } from '../../../errors/PartialContentError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { ImageDeleteService } from '../../../services/image-delete';

export class DeletePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private printsRepository: IPrintsRepository,
  ) { }

  async execute(id: string, requestingUserId: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    const printOrder= await this.printOrdersRepository.listById(id);
    if(!printOrder) {
      throw new PrintOrderNotFound();
    }

    if(requestingUserId !== printOrder.userId) {
      throw new ForbiddenError();
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
