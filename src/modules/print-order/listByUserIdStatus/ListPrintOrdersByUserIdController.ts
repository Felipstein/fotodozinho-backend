import { Request, Response } from 'express';
import { convertPrintOrderStatus, isPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { ListPrintOrdersByUserIdStatusUseCases } from './ListPrintOrdersByUserIdUseCases';

export class ListPrintOrdersByUserIdStatusController {

  constructor(
    private listPrintOrdersByUserIdStatusUseCases: ListPrintOrdersByUserIdStatusUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, status } = req.params;

    if(!isPrintOrderStatus(status)) {
      throw new BadRequestError('Esse tipo de status não existe. Os tipos de status são: "WAITING", "IN_PRODUCTION" ou "DONE".');
    }

    const printOrders = await this.listPrintOrdersByUserIdStatusUseCases.execute(userId, convertPrintOrderStatus(status));

    return res.json(printOrders);
  }

}
