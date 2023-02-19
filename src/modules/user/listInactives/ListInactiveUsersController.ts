import { Request, Response } from 'express';
import { ListInactiveUsersUseCases } from './ListInactiveUsersUseCases';

export class ListInactiveUsersController {

  constructor(
    private listInactiveUsersUseCases: ListInactiveUsersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const users = await this.listInactiveUsersUseCases.execute();

    return res.json(users);
  }

}
