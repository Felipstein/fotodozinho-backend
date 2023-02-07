import { Request, Response } from 'express';
import { ListPaymentMethodByIdUseCases } from './ListPaymentMethodByIdUseCases';

export class ListPaymentMethodByIdController {

  constructor(
    private listPaymentMethodbyIdUseCases: ListPaymentMethodByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const paymentMethod = await this.listPaymentMethodbyIdUseCases.execute(id);

    return res.json(paymentMethod);
  }

}
