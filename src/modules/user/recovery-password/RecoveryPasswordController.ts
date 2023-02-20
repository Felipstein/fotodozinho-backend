import { Request, Response } from 'express';
import { RecoveryPasswordUseCase } from './RecoveryPasswordUseCase';

export class RecoveryPasswordController {

  constructor(
    private recoveryPasswordUseCase: RecoveryPasswordUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await this.recoveryPasswordUseCase.execute({ email });

    return res.sendStatus(200);
  }

}
