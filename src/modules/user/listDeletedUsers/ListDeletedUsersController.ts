import { Request, Response } from 'express';
import { ListDeletedUsersUseCases } from './ListDeletedUsersUseCases';

export class ListDeletedUsersController {

  constructor(
    private listDeletedUsersUseCases: ListDeletedUsersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const when = req.query.when as 'lastweek' | 'lastmonth' | undefined;

    const deletedUsers = await this.listDeletedUsersUseCases.execute(when);

    return res.json(deletedUsers);
  }

}
