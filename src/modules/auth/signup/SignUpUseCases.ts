import { userViewMapper } from '../../../domain/UserViewMapper';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { accessTokenProvider } from '../../../providers/AccessToken';
import { crypt } from '../../../providers/Crypt';
import { refreshTokenProvider } from '../../../providers/RefreshToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { SignUpRequest, SignUpResponse } from './SignUpDTO';

export class SignUpUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name, email, phone, password, confirmPassword }: SignUpRequest): Promise<SignUpResponse> {
    if(ValidateService.someIsNullOrUndefined(name, email, password, confirmPassword)) {
      throw new RequiredFieldsError('Name', 'E-mail', 'Senha', 'Confirmar senha');
    }

    if(password.length < 3) {
      throw new BadRequestError('Senha muito curta. Por favor, escolha uma senha com pelo menos 3 caracteres');
    }

    if(password !== confirmPassword) {
      throw new BadRequestError('A confirmação de senha não corresponde à senha inserida. Por favor, tente novamente');
    }

    const emailExists = await this.usersRepository.listByEmail(email);
    if(emailExists) {
      throw new BadRequestError('E-mail já em uso');
    }

    const encryptedPassword = await crypt.hash(password);

    const user = await this.usersRepository.create({
      name, email, phone, password: encryptedPassword,
    }, false);
    const userId = user.id;

    const token = accessTokenProvider.generate({ userId: userId });
    const { id: refreshToken } = await refreshTokenProvider.generate(userId);

    return { user: userViewMapper.toPublic(user), token, refreshToken };
  }

}
