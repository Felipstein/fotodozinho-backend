import { Request, Response } from 'express';
import { UpdateUserPasswordUseCases } from './UpdateUserPasswordUseCases';

export class UpdateUserPasswordController {

  constructor(
    private updateUserPasswordUseCases: UpdateUserPasswordUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await this.updateUserPasswordUseCases.execute({ userId, currentPassword, newPassword, confirmNewPassword }, req.userIsAdmin);

    return res.json(user);
  }

}
