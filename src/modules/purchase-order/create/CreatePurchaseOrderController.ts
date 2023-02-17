import { Request, Response } from 'express';
import { CreatePurchaseOrderUseCases } from './CreatePurchaseOrderUseCases';

export class CreatePurchaseOrderController {

  constructor(
    private createPurchaseOrderUseCases: CreatePurchaseOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { paymentMethodId, products, userId } = req.body;

    const purchaseOrder = await this.createPurchaseOrderUseCases.execute({ paymentMethodId, products, userId });

    return res.status(201).json(purchaseOrder);
  }

}
