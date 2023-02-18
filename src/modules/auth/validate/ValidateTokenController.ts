import { Request, Response } from 'express';
import { ValidateTokenUseCases } from './ValidateTokenUseCases';

export class ValidateTokenController {

  constructor(
    private validateTokenUseCases: ValidateTokenUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, tokenRequesting } = req;

    const response = await this.validateTokenUseCases.execute({ userId, token: tokenRequesting });

    return res.json(response);
  }

}
