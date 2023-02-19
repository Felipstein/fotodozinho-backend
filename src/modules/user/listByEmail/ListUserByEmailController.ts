import { Request, Response } from 'express';
import { ListUserByEmailUseCases } from './ListUserByEmailUseCases';

export class ListUserByEmailController {

  constructor(
    private listUserByEmailUseCases: ListUserByEmailUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const user = await this.listUserByEmailUseCases.execute(email, req.userId, req.userIsAdmin);

    return res.json(user);
  }

}
