import { Request, Response } from 'express';
import { convertPrintOrderStatus, isPrintOrderStatus } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UpdatePrintOrderStatusUseCases } from './UpdatePrintOrderStatusUseCases';

export class UpdatePrintOrderStatusController {

  constructor(
    private updatePrintOrderStatusUseCases: UpdatePrintOrderStatusUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;

    if(!status || !isPrintOrderStatus(status)) {
      throw new BadRequestError('O campo status só pode ter três tipos de valores: "WAITING", "IN_PRODUCTION" ou "DONE".');
    }

    const printOrderUpdated = await this.updatePrintOrderStatusUseCases.execute(id, convertPrintOrderStatus(status));

    return res.json(printOrderUpdated);
  }

}