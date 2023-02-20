import { Request, Response } from 'express';
import { SignUpUseCases } from './SignUpUseCases';

export class SignUpController {

  constructor(
    private signUpUseCases: SignUpUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, password, confirmPassword, notifyServicesByEmail } = req.body;

    const response = await this.signUpUseCases.execute({ name, email, phone, password, confirmPassword, notifyServicesByEmail });

    return res.status(201).json(response);
  }

}
