import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { passwordRecoveryTokenProvider } from '../../../providers/PasswordRecoveryToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ValidateRecoveryPasswordTokenUseCase {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(recoveryPasswordToken: string): Promise<void> {
    if(!recoveryPasswordToken) {
      throw new RequiredFieldsError('Token');
    }

    const passwordRecoveryToken = await passwordRecoveryTokenProvider.getPasswordRecoveryToken({ id: recoveryPasswordToken });
    if(!passwordRecoveryToken) {
      throw new BadRequestError('Token inválido ou expirado');
    }

    if(passwordRecoveryTokenProvider.isExpired(passwordRecoveryToken)) {
      throw new BadRequestError('Token inválido ou expirado');
    }

    const user = await this.usersRepository.listById(passwordRecoveryToken.userId);
    if(!user) {
      throw new BadRequestError('Token inválido ou expirado');
    }
  }

}
