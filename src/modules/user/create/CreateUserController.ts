import { Request, Response } from 'express';

import { CreateUserUseCases } from './CreateUserUseCases';

export class CreateUserController {

  constructor(
    private createUserUseCases: CreateUserUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, password } = req.body;

    const user = await this.createUserUseCases.execute({ name, email, phone, password });

    return res.status(201).json(user);
  }

}
