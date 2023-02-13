import { Request, Response } from 'express';
import { UpdatePurchaseOrderUseCases } from './UpdatePurchaseOrderUseCases';

export class UpdatePurchaseOrderController {

  constructor(
    private updatePurchaseOrderUseCases: UpdatePurchaseOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, freight, discount } = req.body;

    const purchaseOrder = await this.updatePurchaseOrderUseCases.execute(id, { status, freight, discount });

    return res.json(purchaseOrder);
  }

}
