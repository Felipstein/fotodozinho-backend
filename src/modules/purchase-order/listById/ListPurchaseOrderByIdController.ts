import { Request, Response } from 'express';
import { ListPurchaseOrderByIdUseCases } from './ListPurchaseOrderByIdUseCases';

export class ListPurchaseOrderByIdController {

  constructor(
    private listPurchaseOrderByIdUseCases: ListPurchaseOrderByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const purchaseOrder = await this.listPurchaseOrderByIdUseCases.execute(id);

    return res.json(purchaseOrder);
  }

}
