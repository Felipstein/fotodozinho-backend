import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { crypt } from '../../../providers/Crypt';
import { passwordRecoveryTokenProvider } from '../../../providers/PasswordRecoveryToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { RecoveryPasswordRequest } from './RecoveryPasswordDTO';

export class RecoveryPasswordUseCase {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ passwordRecoveryTokenId, newPassword, confirmNewPassword }: RecoveryPasswordRequest): Promise<void> {
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

    if(newPassword !== confirmNewPassword) {
      throw new BadRequestError('As senhas não coincidem');
    }

    const samePassword = await crypt.matches(newPassword, user.password);
    if(samePassword) {
      throw new BadRequestError('A nova senha não pode ser igual à sua atual');
    }

    const encryptedPassword = await crypt.hash(newPassword);
    await this.usersRepository.update(userId, { password: encryptedPassword }, false);

    await passwordRecoveryTokenProvider.delete({ id: passwordRecoveryTokenId });
  }

}
