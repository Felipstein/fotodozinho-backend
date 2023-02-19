import { Request, Response } from 'express';
import { ListPrintOrdersUseCases } from './ListPrintOrdersUseCases';
import { PrintOrderStatus } from '../../../entities/print-order/IPrintOrder';

export class ListPrintOrdersController {

  constructor(
    private listPrintOrdersUseCases: ListPrintOrdersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const status = req.query.status as PrintOrderStatus | undefined;

    const printOrders = await this.listPrintOrdersUseCases.execute(status);

    return res.json(printOrders);
  }

}
