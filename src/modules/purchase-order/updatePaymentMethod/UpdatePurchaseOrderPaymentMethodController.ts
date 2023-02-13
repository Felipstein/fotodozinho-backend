import { Request, Response } from 'express';
import { UpdatePurchaseOrderPaymentMethodUseCases } from './UpdatePurchaseOrderPaymentMethodUseCases';

export class UpdatePurchaseOrderPaymentMethodController {

  constructor(
    private updatePurchaseOrderPaymentMethodUseCases: UpdatePurchaseOrderPaymentMethodUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    const purchaseOrder = await this.updatePurchaseOrderPaymentMethodUseCases.execute(id, paymentMethod);

    return res.json(purchaseOrder);
  }

}
