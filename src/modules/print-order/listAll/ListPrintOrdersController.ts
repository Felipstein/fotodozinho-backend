import { Request, Response } from 'express';
import { ListPrintOrdersUseCases } from './ListPrintOrdersUseCases';

export class ListPrintOrdersController {

  constructor(
    private listPrintOrdersUseCases: ListPrintOrdersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const printOrders = await this.listPrintOrdersUseCases.execute();

    return res.json(printOrders);
  }

}
