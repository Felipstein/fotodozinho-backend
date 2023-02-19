import { userViewMapper } from '../../../domain/UserViewMapper';
import { InvalidTokenError } from '../../../errors/InvalidTokenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { ValidateTokenRequest, ValidateTokenResponse } from './ValidateTokenDTO';

export class ValidateTokenUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ userId, token }: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    if(ValidateService.someIsNullOrUndefined(userId, token)) {
      throw new RequiredFieldsError('Usuário', 'Token');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new InvalidTokenError();
    }

    return { user: userViewMapper.toPublic(user), token };
  }

}
