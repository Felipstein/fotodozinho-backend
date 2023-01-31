import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';

export class ListPrintOrdersUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(): Promise<IPrintOrder[]> {
    const printOrders = await this.printOrdersRepository.listAll();

    return printOrders;
  }

}
