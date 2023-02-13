import { Request, Response } from 'express';
import { UpdatePrintOrderStatusUseCases } from './UpdatePrintOrderStatusUseCases';

export class UpdatePrintOrderStatusController {

  constructor(
    private updatePrintOrderStatusUseCases: UpdatePrintOrderStatusUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;

    const printOrderUpdated = await this.updatePrintOrderStatusUseCases.execute(id, status);

    return res.json(printOrderUpdated);
  }

}
