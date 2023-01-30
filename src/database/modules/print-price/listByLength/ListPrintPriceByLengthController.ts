import { Request, Response } from 'express';
import { ListPrintPriceByLengthUseCases } from './ListPrintPriceByLengthUseCases';

export class ListPrintPriceByLengthController {

  constructor(
    private listPrintPriceByLengthUseCases: ListPrintPriceByLengthUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { length } = req.params;

    const printPrice = await this.listPrintPriceByLengthUseCases.execute(length);

    return res.json(printPrice);
  }

}
