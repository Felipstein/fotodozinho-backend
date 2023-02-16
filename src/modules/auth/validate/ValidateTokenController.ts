import { Request, Response } from 'express';
import { ValidateTokenUseCases } from './ValidateTokenUseCases';

export class ValidateTokenController {

  constructor(
    private validateTokenUseCases: ValidateTokenUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    const response = await this.validateTokenUseCases.execute({ token });

    return res.json(response);
  }

}
