import { Request, Response } from 'express';
import { ListUsersUseCases } from './ListUsersUseCases';
export class ListUsersController {

  constructor(
    private listUsersUseCases: ListUsersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const user = await this.listUsersUseCases.execute();

    return res.json(user);
  }

}
