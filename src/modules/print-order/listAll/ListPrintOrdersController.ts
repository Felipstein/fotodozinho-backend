import { Request, Response } from 'express';
import { ListPrintOrdersUseCases } from './ListPrintOrdersUseCases';
import { PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';

export class ListPrintOrdersController {

  constructor(
    private listPrintOrdersUseCases: ListPrintOrdersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const status = req.query.status as PrintOrderStatus | undefined;
    const when = req.query.when as 'today' | 'lastweek' | 'lastmonth' | undefined;

    const printOrders = await this.listPrintOrdersUseCases.execute(status, when);

    return res.json(printOrders);
  }

}
