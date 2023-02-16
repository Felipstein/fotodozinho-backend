import { InvalidCredentialsError } from '../../../errors/InvalidCredentialsError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { crypt } from '../../../providers/Crypt';
import { tokenProvider } from '../../../providers/Token';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { SignInRequest, SignInResponse } from './SignInDTO';

export class SignInUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ email, password }: SignInRequest): Promise<SignInResponse> {
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

    const token = tokenProvider.generate({ userId: user.id });

    delete user.password;

    return { user, token };
  }

}
