import { Request, Response } from 'express';
import { ListUserByIdUseCases } from './ListUserByIdUseCases';

export class ListUserByIdController {

  constructor(
    private listUserByIdUseCases: ListUserByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await this.listUserByIdUseCases.execute(id, req.userIsAdmin);

    return res.json(user);
  }

}
