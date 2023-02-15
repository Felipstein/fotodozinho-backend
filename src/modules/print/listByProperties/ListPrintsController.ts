import { Request, Response } from 'express';
import { ListPrintsUseCases } from './ListPrintsUseCases';

export class ListPrintsController {

  constructor(
    private listPrintsUseCases: ListPrintsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { key, printOrderId } = req.query as {
      key: string, printOrderId: string,
    };

    const prints = await this.listPrintsUseCases.execute({ key, printOrderId });

    return res.json(prints);
  }

}
