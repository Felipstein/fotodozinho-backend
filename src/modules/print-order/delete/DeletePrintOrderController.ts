import { Request, Response } from 'express';
import { DeletePrintOrderUseCases } from './DeletePrintOrderUseCases';

export class DeletePrintOrderController {

  constructor(
    private deletePrintOrderUseCases: DeletePrintOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deletePrintOrderUseCases.execute(id, req.userId);

    return res.sendStatus(204);
  }

}
