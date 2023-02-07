import { Request, Response } from 'express';
import { CreatePaymentMethodUseCases } from './CreatePaymentMethodUseCases';

export class CreatePaymentMethodController {

  constructor(
    private createPaymentMethodUseCases: CreatePaymentMethodUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const paymentMethod = await this.createPaymentMethodUseCases.execute({ name });

    return res.status(201).json(paymentMethod);
  }

}
