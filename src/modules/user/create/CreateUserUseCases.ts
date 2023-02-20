import { BadRequestError } from './../../../errors/BadRequestError';
import { crypt } from '../../../providers/Crypt';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { IUserView } from '../../../entities/user/IUserView';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { ValidateService } from '../../../services/validate';
import { UserCreateRequest } from '../../../entities/user/dtos/UserCreateRequest';

export class CreateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute({ name, email, phone, password, notifyServicesByEmail, admin = false }: UserCreateRequest, isTest = false): Promise<IUserView> {
    if(ValidateService.someIsNullOrUndefined(name, email, password)) {
      throw new RequiredFieldsError('Nome', 'E-mail', 'Senha');
    }

    const emailAlreadyExists = await this.usersRepository.listByEmail(email);
    if(emailAlreadyExists) {
      throw new BadRequestError('E-mail já em uso');
    }

    const encryptedPassword = await crypt.hash(password);
    const user = await this.usersRepository.create({ name, email, phone, password: encryptedPassword, admin, notifyServicesByEmail }, isTest);

    await this.shoppingCartsRepository.create(user.id);

    return user;
  }

}
