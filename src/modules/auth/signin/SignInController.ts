import { Request, Response } from 'express';
import { SignInUseCases } from './SignInUseCases';

export class SignInController {

  constructor(
    private signInUseCases: SignInUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await this.signInUseCases.execute({ email, password });

    return res.json(user);
  }

}
