import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';

export class DeletePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const printOrderExists = await this.printOrdersRepository.listById(id);
    if(!printOrderExists) {
      throw new PrintOrderNotFound();
    }

    await this.printOrdersRepository.delete(id);
  }

}
