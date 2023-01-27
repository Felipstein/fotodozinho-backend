import { BadRequestError } from './../../../errors/BadRequestError';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { CreateUserDTO } from './CreateUserDTO';
import { crypt } from '../../../providers/Crypt';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { IUserView } from '../../../entities/user/IUserView';

export class CreateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name, email, phone, password, admin = false }: CreateUserDTO, isTest = false): Promise<IUserView> {
    if(someIsNullOrUndefined(name, email, password)) {
      throw new RequiredFieldsError();
    }

    const emailAlreadyExists = await this.usersRepository.listByEmail(email);
    if(emailAlreadyExists) {
      throw new BadRequestError('E-mail já em uso');
    }

    const encryptedPassword = await crypt.hash(password);
    const user = await this.usersRepository.create({ name, email, phone, password: encryptedPassword, admin }, isTest);

    return user;
  }

}
