import { userViewMapper } from '../../../domain/UserViewMapper';
import { BadRequestError } from '../../../errors/BadRequestError';
import { PasswordTooShortError } from '../../../errors/PasswordTooShortError';
import { PasswordsDoNotMatchError } from '../../../errors/PasswordsDoNotMatchError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { accessTokenProvider } from '../../../providers/AccessToken';
import { crypt } from '../../../providers/Crypt';
import { refreshTokenProvider } from '../../../providers/RefreshToken';
import { validatorTokenProvider } from '../../../providers/ValidatorToken';
import { EmailService } from '../../../providers/emails/EmailService';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ParseBoolean } from '../../../services/parse-boolean';
import { ValidateService } from '../../../services/validate';
import { SignUpRequest, SignUpResponse } from './SignUpDTO';

export class SignUpUseCases {

  constructor(
    private usersRepository: IUsersRepository,
    private shoppingCartsRepository: IShoppingCartsRepository,
    private emailService: EmailService,
  ) { }

  async execute({ name, email, phone, password, confirmPassword, notifyServicesByEmail, acceptedTermsAndConditions }: SignUpRequest): Promise<SignUpResponse> {
    if(ValidateService.someIsNullOrUndefined(name, email, password, confirmPassword, notifyServicesByEmail, acceptedTermsAndConditions)) {
      throw new RequiredFieldsError('Name', 'E-mail', 'Senha', 'Confirmar senha', 'Notificar serviços pelo e-mail', 'Aceito sobre os Termos de Condições e Uso');
    }

    if(ParseBoolean.parse(acceptedTermsAndConditions)) {
      throw new BadRequestError('Você deve aceitar os termos de condições e de uso para prosseguir');
    }

    if(password.length < 3) {
      throw new PasswordTooShortError();
    }

    if(password !== confirmPassword) {
      throw new PasswordsDoNotMatchError();
    }

    const emailExists = await this.usersRepository.listByEmail(email);
    if(emailExists) {
      throw new BadRequestError('E-mail já em uso');
    }

    const encryptedPassword = await crypt.hash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      password: encryptedPassword,
      notifyServicesByEmail: ParseBoolean.parse(notifyServicesByEmail),
    }, false);
    const userId = user.id;

    await this.shoppingCartsRepository.create(user.id);

    const token = accessTokenProvider.generate({ userId: userId });
    const { id: refreshToken } = await refreshTokenProvider.generate(userId);
    const { id: validatorToken } = await validatorTokenProvider.generate(email);

    await this.emailService.sendConfirmEmail(email, name, validatorToken);

    return { user: userViewMapper.toPublic(user), token, refreshToken };
  }

}
