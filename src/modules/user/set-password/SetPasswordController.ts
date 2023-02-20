import { Request, Response } from 'express';
import { SetPasswordUseCase } from './SetPasswordUseCase';

export class SetPasswordController {

  constructor(
    private setPasswordUseCase: SetPasswordUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { token, newPassword, confirmNewPassword } = req.body;

    await this.setPasswordUseCase.execute({ passwordRecoveryTokenId: token, newPassword, confirmNewPassword });

    return res.sendStatus(200);
  }

}
