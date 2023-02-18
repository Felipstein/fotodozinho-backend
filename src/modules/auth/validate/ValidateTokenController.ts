import { Request, Response } from 'express';
import { ValidateTokenUseCases } from './ValidateTokenUseCases';

export class ValidateTokenController {

  constructor(
    private validateTokenUseCases: ValidateTokenUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { tokenRequesting } = req;

    const response = await this.validateTokenUseCases.execute({ token: tokenRequesting });

    return res.json(response);
  }

}
