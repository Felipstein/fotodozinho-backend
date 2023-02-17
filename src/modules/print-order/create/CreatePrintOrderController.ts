import { Request, Response } from 'express';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

export class CreatePrintOrderController {

  constructor(
    private createPrintOrderUseCases: CreatePrintOrderUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { totalPrintsExpected, userId } = req.body;

    const printOrder = await this.createPrintOrderUseCases.execute({ totalPrintsExpected, userId });

    return res.status(201).json(printOrder);
  }

}
