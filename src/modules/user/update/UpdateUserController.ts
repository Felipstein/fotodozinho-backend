import { Request, Response } from 'express';
import { UpdateUserUseCases } from './UpdateUserUseCases';

export class UpdateUserController {

  constructor(
    private updateUserUseCases: UpdateUserUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, password, phone, admin, totalPrints, totalPrintOrders, totalPurchases } = req.body;

    const user = await this.updateUserUseCases.execute(id, { name, password, phone, admin, totalPrints, totalPrintOrders, totalPurchases });

    return res.json(user);
  }

}
