import { Request, Response } from 'express';
import { DeletePurchaseOrderUseCases } from './DeletePurchaseOrderUseCases';

export class DeletePurchaseOrderController {

  constructor(
    private deletePurchaseOrderUseCases: DeletePurchaseOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deletePurchaseOrderUseCases.execute(id);

    return res.sendStatus(204);
  }

}
