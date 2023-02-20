import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { validatorTokenProvider } from '../../../providers/ValidatorToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ValidateEmailUseCase {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(validatorToken: string): Promise<void> {
    if(!validatorToken) {
      throw new RequiredFieldsError('Token');
    }

    await validatorTokenProvider.verify(validatorToken);
    const { email } = await validatorTokenProvider.getValidatorToken(validatorToken);

    const { id: userId } = await this.usersRepository.listByEmail(email);
    await this.usersRepository.update(userId, { verified: true }, false);

    await validatorTokenProvider.delete({ id: validatorToken });
  }

}
