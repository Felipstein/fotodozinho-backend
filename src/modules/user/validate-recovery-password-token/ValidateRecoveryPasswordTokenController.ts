import { Request, Response } from 'express';
import { ValidateRecoveryPasswordTokenUseCase } from './ValidateRecoveryPasswordTokenUseCase';

export class ValidateRecoveryPasswordTokenController {

  constructor(
    private validateRecoveryPasswordTokenUseCase: ValidateRecoveryPasswordTokenUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    await this.validateRecoveryPasswordTokenUseCase.execute(token);

    return res.sendStatus(204);
  }

}
