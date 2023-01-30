import { Request, Response } from 'express';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

export class CreatePrintOrderController {

  constructor(
    private createPrintOrderUseCases: CreatePrintOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { prints, userId } = req.body;

    const { printOrder, rejectedPrints } = await this.createPrintOrderUseCases.execute({ prints, userId });

    return res.status(201).json({ printOrder, rejectedPrints });
  }

}
