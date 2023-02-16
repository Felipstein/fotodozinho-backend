import { InvalidTokenError } from '../../../errors/InvalidTokenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { tokenProvider } from '../../../providers/Token';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateTokenRequest, ValidateTokenResponse } from './ValidateTokenDTO';

export class ValidateTokenUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ token }: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    if(!token) {
      throw new RequiredFieldsError('Token');
    }

    await tokenProvider.verify(token);

    const { userId } = tokenProvider.decode(token);
    if(!userId) {
      throw new InvalidTokenError();
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new InvalidTokenError();
    }

    return { user, token };
  }

}
