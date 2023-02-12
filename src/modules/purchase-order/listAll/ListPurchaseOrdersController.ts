import { Request, Response } from 'express';
import { ListPurchaseOrdersUseCases } from './ListPurchaseOrdersUseCases';

export class ListPurchaseOrdersController {

  constructor(
    private listPurchaseOrdersUseCases: ListPurchaseOrdersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const purchaseOrders = await this.listPurchaseOrdersUseCases.execute();

    return res.json(purchaseOrders);
  }

}
