import { PasswordRecoveryToken } from '@prisma/client';
import { IPasswordRecoveryToken } from '../entities/password-recovery-token/IPasswordRecoveryToken';

type PasswordRecoveryTokenDomain = IPasswordRecoveryToken;
type PasswordRecoveryTokenPersistence = PasswordRecoveryToken;

class PasswordRecoveryTokenMapper {

  toDomain(passwordRecoveryTokenPersistence: PasswordRecoveryTokenPersistence): PasswordRecoveryTokenDomain {
    return {
      id: passwordRecoveryTokenPersistence.id,
      expiresIn: Number(passwordRecoveryTokenPersistence.expiresIn),
      userId: passwordRecoveryTokenPersistence.userId,
    };
  }

}

const passwordRecoveryTokenMapper = new PasswordRecoveryTokenMapper();

export { passwordRecoveryTokenMapper };
