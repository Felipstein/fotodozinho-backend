import { Request, Response } from 'express';
import { RefreshTokenUseCases } from './RefreshTokenUseCases';

export class RefreshTokenController {

  constructor(
    private refreshTokenUseCases: RefreshTokenUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    const tokenResponse = await this.refreshTokenUseCases.execute(refreshToken);

    return res.status(201).json(tokenResponse);
  }

}
