import { Request, Response } from 'express';
import { ListPrintOrdersByUserIdUseCases } from './ListPrintOrdersByUserIdUseCases';

export class ListPrintOrdersByUserIdController {

  constructor(
    private listPrintOrdersByUserIdUseCases: ListPrintOrdersByUserIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const printOrders = await this.listPrintOrdersByUserIdUseCases.execute(userId);

    return res.json(printOrders);
  }

}
