import { Request, Response } from 'express';
import { ValidateEmailUseCase } from './ValidateEmailUseCase';

export class ValidateEmailController {

  constructor(
    private validateEmailUseCase: ValidateEmailUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    await this.validateEmailUseCase.execute(token);

    return res.sendStatus(204);
  }

}
