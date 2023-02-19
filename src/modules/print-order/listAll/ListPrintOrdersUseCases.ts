import { convertPrintOrderStatus, isPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { IPrintOrder, PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';

export class ListPrintOrdersUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(status?: PrintOrderStatus): Promise<IPrintOrder[]> {
    if(status && !isPrintOrderStatus(status)) {
      throw new BadRequestError('Tipo de status inválido. Os status são "in_production", "waiting", "done" e "uploading_images"');
    }

    const printOrders = await this.printOrdersRepository.listAll(convertPrintOrderStatus(status));

    return printOrders;
  }

}
