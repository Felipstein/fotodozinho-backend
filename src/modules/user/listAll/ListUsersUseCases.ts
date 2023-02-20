import { IUserView } from '../../../entities/user/IUserView';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ListUsersUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(): Promise<IUserView[]> {
    const users = await this.usersRepository.listAll();

    return users;
  }

}
