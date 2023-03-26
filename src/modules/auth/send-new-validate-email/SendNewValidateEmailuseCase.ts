import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { EmailService } from '../../../providers/emails/EmailService';
import { validatorTokenProvider } from '../../../providers/ValidatorToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class SendNewValidateEmailUseCase {

  constructor(
    private usersRepository: IUsersRepository,
    private emailService: EmailService,
  ) { }

  async execute(email: string, requestingUserId: string): Promise<void> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const user = await this.usersRepository.listByEmail(email);
    if(!user) {
      throw new UserNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, user.id);

    if(user.verified) {
      throw new BadRequestError('O usuário já está verificado.');
    }

    const { id: validatorToken } = await validatorTokenProvider.generate(email);
    await this.emailService.sendConfirmEmail(email, user.name, validatorToken);
  }

}
