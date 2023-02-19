import { InvalidCredentialsError } from '../../../errors/InvalidCredentialsError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { crypt } from '../../../providers/Crypt';
import { refreshTokenProvider } from '../../../providers/RefreshToken';
import { tokenProvider } from '../../../providers/Token';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ParseBoolean } from '../../../services/parse-boolean';
import { ValidateService } from '../../../services/validate';
import { SignInRequest, SignInResponse } from './SignInDTO';

export class SignInUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ email, password, rememberMe }: SignInRequest): Promise<SignInResponse> {
    if(ValidateService.someIsNullOrUndefined(email, password)) {
      throw new RequiredFieldsError('E-mail', 'Senha');
    }

    const user = await this.usersRepository.listByEmail(email, true);
    if(!user) {
      throw new InvalidCredentialsError();
    }

    // @ts-ignore
    const correctPassword = await crypt.matchesPassword(password, user);
    if(!correctPassword) {
      throw new InvalidCredentialsError();
    }

    delete user.password;
    const userId = user.id;

    const token = tokenProvider.generate({ userId });

    let refreshToken;
    if(rememberMe && ParseBoolean.parse(rememberMe)) {
      const userHasRefreshToken = await refreshTokenProvider.userHasRefreshToken(userId);
      if(userHasRefreshToken) {
        refreshToken = (await refreshTokenProvider.renewExpiresIn(userId)).userId;
      } else {
        refreshToken = (await refreshTokenProvider.generate(userId)).userId;
      }

    }

    return { user, token, refreshToken };
  }

}
