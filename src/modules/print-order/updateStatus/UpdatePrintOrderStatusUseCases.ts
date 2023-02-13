import { IPrintOrder, PrintOrderStatus, isPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
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

    if(!isPrintOrderStatus(newStatus)) {
      throw new BadRequestError('O campo status só pode ter três tipos de valores: "WAITING", "IN_PRODUCTION" ou "DONE".');
    }

    const printOrderExists = await this.printOrdersRepository.listById(id);
    if(!printOrderExists) {
      throw new PrintOrderNotFound();
    }

    const printOrderUpdated = await this.printOrdersRepository.updateStatus(id, newStatus);

    return printOrderUpdated;
  }

}
