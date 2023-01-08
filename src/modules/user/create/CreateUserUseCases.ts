import { IUserView } from './../../../entities/IUserView';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name, email, phone, password }: CreateUserDTO): Promise<IUserView> {

  }

}
