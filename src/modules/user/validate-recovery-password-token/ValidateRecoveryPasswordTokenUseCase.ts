import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { passwordRecoveryTokenProvider } from '../../../providers/PasswordRecoveryToken';

export class ValidateRecoveryPasswordTokenUseCase {

  async execute(recoveryPasswordToken: string): Promise<void> {
    if(!recoveryPasswordToken) {
      throw new RequiredFieldsError('Token');
    }

    await passwordRecoveryTokenProvider.verifyToken({ id: recoveryPasswordToken });
  }

}
