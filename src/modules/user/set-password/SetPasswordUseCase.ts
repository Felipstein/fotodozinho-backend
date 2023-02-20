import { BadRequestError } from '../../../errors/BadRequestError';
import { PasswordTooShortError } from '../../../errors/PasswordTooShortError';
import { PasswordsDoNotMatchError } from '../../../errors/PasswordsDoNotMatchError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { SamePasswordsError } from '../../../errors/SamePasswordsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { crypt } from '../../../providers/Crypt';
import { passwordRecoveryTokenProvider } from '../../../providers/PasswordRecoveryToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { SetPasswordRequest } from './SetPasswordDTO';

export class SetPasswordUseCase {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ passwordRecoveryTokenId, newPassword, confirmNewPassword }: SetPasswordRequest): Promise<void> {
    if(ValidateService.someIsNullOrUndefined(passwordRecoveryTokenId, newPassword, confirmNewPassword)) {
      throw new RequiredFieldsError('Token', 'Nova senha', 'Confirmar nova senha');
    }

    const passwordRecoveryToken = await passwordRecoveryTokenProvider.getPasswordRecoveryToken({ id: passwordRecoveryTokenId });
    if(!passwordRecoveryToken) {
      throw new UnauthorizedError('Token inválido ou já expirado');
    }

    if(passwordRecoveryTokenProvider.isExpired(passwordRecoveryToken)) {
      throw new UnauthorizedError('Token já expirado');
    }

    const { userId } = passwordRecoveryToken;

    const user = await this.usersRepository.listById(userId, true);
    if(!user) {
      throw new UnauthorizedError('Token inválido ou já expirado');
    }

    if(newPassword.length < 3) {
      throw new PasswordTooShortError();
    }

    if(newPassword !== confirmNewPassword) {
      throw new PasswordsDoNotMatchError();
    }

    const samePassword = await crypt.matches(newPassword, user.password);
    if(samePassword) {
      throw new SamePasswordsError();
    }

    const encryptedPassword = await crypt.hash(newPassword);
    await this.usersRepository.update(userId, { password: encryptedPassword }, false);

    await passwordRecoveryTokenProvider.delete({ id: passwordRecoveryTokenId });
  }

}
