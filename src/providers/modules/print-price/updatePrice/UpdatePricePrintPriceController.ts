import { Request, Response } from 'express';
import { UpdatePricePrintPriceUseCases } from './UpdatePricePrintPriceUseCases';

export class UpdatePricePrintPriceController {

  constructor(
    private updatePricePrintPriceUseCases: UpdatePricePrintPriceUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { price } = req.body;

    const printPrice = await this.updatePricePrintPriceUseCases.execute(id, { price });

    return res.json(printPrice);
  }

}
