import { IPrintOrder, PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';

export class UpdatePrintOrderStatusUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(id: string, newStatus: PrintOrderStatus): Promise<IPrintOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!newStatus) {
      throw new RequiredFieldsError('Status');
    }

    const printOrderExists = await this.printOrdersRepository.listById(id);
    if(!printOrderExists) {
      throw new PrintOrderNotFound();
    }

    const printOrderUpdated = await this.printOrdersRepository.updateStatus(id, newStatus);

    return printOrderUpdated;
  }

}
