import { Request, Response } from 'express';
import { ListColorsUseCases } from './ListColorsUseCases';

export class ListColorsController {

  constructor(
    private listColorsUseCases: ListColorsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const colors = await this.listColorsUseCases.execute();

    return res.json(colors);
  }

}
