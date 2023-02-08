import { Request, Response } from 'express';
import { DeletePaymentMethodUseCases } from './DeletePaymentMethodUseCaes';

export class DeletePaymentMethodController {

  constructor(
    private deletePaymentMethodUseCases: DeletePaymentMethodUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deletePaymentMethodUseCases.execute(id);

    return res.sendStatus(204);
  }

}
