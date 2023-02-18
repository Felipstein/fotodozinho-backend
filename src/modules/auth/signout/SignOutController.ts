import { Request, Response } from 'express';
import { SignOutUseCases } from './SignOutUseCases';

export class SignOutController {

  constructor(
    private signOutUseCases: SignOutUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, tokenRequesting } = req;

    await this.signOutUseCases.execute({ userId, token: tokenRequesting });

    return res.sendStatus(204);
  }

}
