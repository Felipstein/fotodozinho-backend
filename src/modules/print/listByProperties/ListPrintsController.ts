import { Request, Response } from 'express';
import { ListPrintsUseCases } from './ListPrintsUseCases';

export class ListPrintsController {

  constructor(
    private listPrintsUseCases: ListPrintsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { imageName, imageUrl, key, colorId, printPriceId, printOrderId } = req.query as {
      imageName: string, imageUrl: string, key: string, colorId: string, printPriceId: string, printOrderId: string,
    };

    const prints = await this.listPrintsUseCases.execute({ imageName, imageUrl, key, colorId, printPriceId, printOrderId });

    return res.json(prints);
  }

}
