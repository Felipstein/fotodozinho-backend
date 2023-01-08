import { BadRequestError } from './../../../errors/BadRequestError';
import { IUserView } from './../../../entities/IUserView';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';

import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name, email, phone, password }: CreateUserDTO): Promise<IUserView> {
    if(someIsNullOrUndefined(name, email, password)) {
      throw new BadRequestError('Preencha todos os campos obrigatórios');
    }

    const emailAlreadyExists = await this.usersRepository.listByEmail(email);
    if(emailAlreadyExists) {
      throw new BadRequestError('E-mail já em uso');
    }


  }

}
