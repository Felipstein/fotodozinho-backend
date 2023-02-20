import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { passwordRecoveryTokenProvider } from '../../../providers/PasswordRecoveryToken';
import { EmailService } from '../../../providers/emails/EmailService';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { RecoveryPasswordRequest } from './RecoveryPasswordDTO';

export class RecoveryPasswordUseCase {

  constructor(
    private usersRepository: IUsersRepository,
    private emailService: EmailService,
  ) { }

  async execute({ email }: RecoveryPasswordRequest): Promise<void> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const user = await this.usersRepository.listByEmail(email);
    if(!user) {
      throw new BadRequestError('E-mail não cadastrado');
    }

    const { id: passwordRecoveryTokenId } = await passwordRecoveryTokenProvider.generate(user.id);

    await this.emailService.sendRecoveryPasswordEmail(email, user.name, passwordRecoveryTokenId);
  }

}
