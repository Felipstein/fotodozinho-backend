import { IUserView } from '../../../entities/IUserView';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
export class ListUsersUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(): Promise<IUserView[]> {
    const users = await this.usersRepository.listAll();

    return users;
  }

}
