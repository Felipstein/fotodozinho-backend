import { Request, Response } from 'express';

import { ListPrintPricesUseCases } from './ListPrintPricesUseCases';

export class ListPrintPricesController {

  constructor(
    private listPrintPricesUseCases: ListPrintPricesUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const printPrices = await this.listPrintPricesUseCases.execute();

    return res.json(printPrices);
  }

}
