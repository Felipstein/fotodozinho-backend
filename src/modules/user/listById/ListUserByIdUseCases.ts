import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { IUserView } from '../../../entities/IUserView';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';

export class ListUserByIdUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IUserView> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const user = await this.usersRepository.listById(id);
    if(!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

}
