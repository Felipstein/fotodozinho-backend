import { Request, Response } from 'express';
import { ListPurchaseOrdersUseCases } from './ListPurchaseOrdersUseCases';

export class ListPurchaseOrdersController {

  constructor(
    private listPurchaseOrdersUseCases: ListPurchaseOrdersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.query.userId as string | undefined;

    const purchaseOrders = await this.listPurchaseOrdersUseCases.execute(req.userId, userId);

    return res.json(purchaseOrders);
  }

}
