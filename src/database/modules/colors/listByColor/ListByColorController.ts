import { Request, Response } from 'express';
import { ListByColorUseCases } from './ListByColorUseCases';

export class ListByColorController {

  constructor(
    private listByColorUseCases: ListByColorUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { color } = req.params;

    const colorObj = await this.listByColorUseCases.execute(color);

    return res.json(colorObj);
  }

}
