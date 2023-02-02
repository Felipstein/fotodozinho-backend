import { Request, Response } from 'express';
import { ListPrintOrderByIdUseCases } from './ListPrintOrderByIdUseCases';

export class ListPrintOrderByIdController {

  constructor(
    private listPrintOrderByIdUseCases: ListPrintOrderByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const printOrder = await this.listPrintOrderByIdUseCases.execute(id);

    return res.json(printOrder);
  }

}
