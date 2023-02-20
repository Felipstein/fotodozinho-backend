import { Request, Response } from 'express';
import { UserDeleteAccountUseCase } from './UserDeleteAccountUseCase';

export class UserDeleteAccountController {

  constructor(
    private userDeleteAccountUseCase: UserDeleteAccountUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, password } = req.body;

    await this.userDeleteAccountUseCase.execute({ userId, password });

    return res.sendStatus(204);
  }

}
