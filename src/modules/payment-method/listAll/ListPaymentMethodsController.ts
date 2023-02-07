import { Request, Response } from 'express';
import { ListPaymentMethodsUseCases } from './ListPaymentMethodsUseCases';

export class ListPaymentMethodsController {

  constructor(
    private listPaymentMethodsUseCases: ListPaymentMethodsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const paymentMethods = await this.listPaymentMethodsUseCases.execute();

    return res.json(paymentMethods);
  }

}
