import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { refreshTokenProvider } from '../../../providers/RefreshToken';
import { tokenProvider } from '../../../providers/Token';
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

    await tokenProvider.verify(token);

    const { exp } = tokenProvider.decode(token);

    await this.revokedTokensRepository.createOrUpdate({ token, expiresIn: exp * 1000 });
    await refreshTokenProvider.generate({ userId });
  }

}
