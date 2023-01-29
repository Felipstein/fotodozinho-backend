import { Request, Response } from 'express';

import { DeletePrintPriceUseCases } from './DeletePrintPriceUseCases';

export class DeletePrintPriceController {

  constructor(
    private deletePrintPriceUseCases: DeletePrintPriceUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deletePrintPriceUseCases.execute(id);

    return res.sendStatus(204);
  }

}
