import { Request, Response } from 'express';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

export class CreatePrintOrderController {

  constructor(
    private createPrintOrderUseCases: CreatePrintOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;

    const printOrder = await this.createPrintOrderUseCases.execute({ userId });

    return res.status(201).json(printOrder);
  }

}
