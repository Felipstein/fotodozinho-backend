import { userViewMapper } from '../../../domain/UserViewMapper';
import { IUserPublic } from '../../../entities/user/IUserPublic';
import { IUserView } from '../../../entities/user/IUserView';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ListUserByIdUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string, isAdmin = false): Promise<IUserView | IUserPublic> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const user = await this.usersRepository.listById(id);
    if(!user) {
      throw new UserNotFoundError();
    }

    return isAdmin ? user : userViewMapper.toPublic(user);
  }

}
