import { convertPrintOrderStatus, isPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { IPrintOrder, PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { PrintOrderFilter } from '../../../shared/PrintOrderFilter';

export class ListPrintOrdersUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute(status?: PrintOrderStatus, when?: 'today' | 'lastweek' | 'lastmonth'): Promise<IPrintOrder[]> {
    if(status && !isPrintOrderStatus(status)) {
      throw new BadRequestError('Tipo de status inválido. Os status são "in_production", "waiting", "done" e "uploading_images"');
    }

    let before;
    if(when) {
      let before;
      if(when === 'today') {
        before = Date.now() - 24 * 60 * 60 * 1000;
      } else if(when === 'lastmonth') {
        before = Date.now() - 30 * 24 * 60 * 60 * 1000;
      } else if(when === 'lastweek') {
        before = Date.now() - 7 * 24 * 60 * 60 * 1000;
      } else {
        throw new BadRequestError('Valor inválido para o parâmetro "when". Valores permitidos são "today", "lastmonth" e "lastweek"');
      }
    }

    const filter: PrintOrderFilter = {
      status: status ? convertPrintOrderStatus(status) : undefined,
      when: before ? new Date(before) : undefined,
    };

    const printOrders = await this.printOrdersRepository.listAll(filter);

    return printOrders;
  }

}
