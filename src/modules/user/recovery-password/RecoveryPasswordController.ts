import { Request, Response } from 'express';
import { RecoveryPasswordUseCase } from './RecoveryPasswordUseCase';

export class RecoveryPasswordController {

  constructor(
    private recoveryPasswordUseCase: RecoveryPasswordUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { token: passwordRecoveryTokenId } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    await this.recoveryPasswordUseCase.execute({ passwordRecoveryTokenId, newPassword, confirmNewPassword });

    return res.sendStatus(200);
  }

}
