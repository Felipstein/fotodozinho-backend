import { convertPrintOrderStatus, isPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { IPrintOrder, PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { PrintOrderFilter } from '../../../shared/filters/PrintOrderFilter';
import { getBeforeData } from '../../../utils/getBeforeDate';

export class ListPrintOrdersUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(status?: PrintOrderStatus, when?: 'today' | 'lastweek' | 'lastmonth'): Promise<IPrintOrder[]> {
    if(status && !isPrintOrderStatus(status)) {
      throw new BadRequestError('Tipo de status inválido. Os status são "in_production", "waiting", "done" e "uploading_images"');
    }

    let before;
    try {
      before = getBeforeData(when);
    } catch (err: any) {
      throw new BadRequestError(err.message);
    }

    const filter: PrintOrderFilter = {
      status: status ? convertPrintOrderStatus(status) : undefined,
      when: before,
    };

    const printOrders = await this.printOrdersRepository.listAll(filter);

    return printOrders;
  }

}
