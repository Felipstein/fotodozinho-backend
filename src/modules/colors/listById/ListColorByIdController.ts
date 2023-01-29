import { Request, Response } from 'express';
import { ListColorByIdUseCases } from './ListColorByIdUseCases';

export class ListColorByIdController {

  constructor(
    private listColorByIdUseCases: ListColorByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const color = await this.listColorByIdUseCases.execute(id);

    return res.json(color);
  }

}
