import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { accessTokenProvider } from '../../../providers/AccessToken';
import { IRevokedTokensRepository } from '../../../repositories/revoked-tokens/IRevokedTokensRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { SignOutRequest } from './SignOutDTO';

export class SignOutUseCases {

  constructor(
    private usersRepository: IUsersRepository,
    private revokedTokensRepository: IRevokedTokensRepository,
  ) { }

  async execute({ userId, token }: SignOutRequest): Promise<void> {
    if(ValidateService.someIsNullOrUndefined(userId, token)) {
      throw new RequiredFieldsError('Usuário', 'Token');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    await accessTokenProvider.verify(token);

    const { exp } = accessTokenProvider.decode(token);

    await this.revokedTokensRepository.createOrUpdate({ token, expiresIn: exp * 1000 });
  }

}
