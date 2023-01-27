import { Request, Response } from 'express';
import { CreatePrintPriceUseCases } from './CreatePrintPriceUseCases';

export class CreatePrintPriceController {

  constructor(
    private createPrintPriceUseCases: CreatePrintPriceUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { length, price } = req.body;

    const printPrice = await this.createPrintPriceUseCases.execute({ length, price });

    return res.status(201).json(printPrice);
  }

}
