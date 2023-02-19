import { Request, Response } from 'express';
import { ListUsersUseCases } from './ListUsersUseCases';
import { ParseBoolean } from '../../../services/parse-boolean';
export class ListUsersController {

  constructor(
    private listUsersUseCases: ListUsersUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const includeDeletedUsers = req.query.includeDeletedUsers as string | undefined;

    const user = await this.listUsersUseCases.execute(ParseBoolean.parse(includeDeletedUsers));

    return res.json(user);
  }

}
