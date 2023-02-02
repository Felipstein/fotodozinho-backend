import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';

export class ListPrintOrderByIdUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(id: string): Promise<IPrintOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const printOrder = await this.printOrdersRepository.listById(id);
    if(!printOrder) {
      throw new PrintOrderNotFound();
    }

    return printOrder;
  }

}
