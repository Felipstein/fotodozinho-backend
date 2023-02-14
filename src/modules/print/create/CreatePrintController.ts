import { Request, Response } from 'express';
import { CreatePrintUseCases } from './CreatePrintUseCases';

export class CreatePrintController {

  constructor(
    private createPrintUseCases: CreatePrintUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { border, colorId, printPriceId, quantity, printOrderId } = req.body;

    const print = await this.createPrintUseCases.execute({
      imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId,
    });

    return res.status(201).json(print);
  }

}
