import { BadRequestError } from './../../../errors/BadRequestError';
import { IUserView } from './../../../entities/IUserView';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';

import { CreateUserDTO } from './CreateUserDTO';
import { crypt } from '../../../providers/Crypt';

export class CreateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name, email, phone, password }: CreateUserDTO): Promise<IUserView> {
    if(someIsNullOrUndefined(name, email, password)) {
      throw new BadRequestError('Os campos nome, e-mail e senha são obrigatórios');
    }

    const emailAlreadyExists = await this.usersRepository.listByEmail(email);
    if(emailAlreadyExists) {
      throw new BadRequestError('E-mail já em uso');
    }

    const encryptedPassword = await crypt.hash(password);
    const user = await this.usersRepository.create({ name, email, phone, password: encryptedPassword });

    return user;
  }

}
