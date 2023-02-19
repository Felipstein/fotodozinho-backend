import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { getBeforeData } from '../../../utils/getBeforeDate';

export class ListDeletedUsersUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(when?: 'lastweek' | 'lastmonth'): Promise<IUserView[]> {
    let before;
    if(when) {
      try {
        before = getBeforeData(when);
      } catch (err: any) {
        throw new BadRequestError(err.message);
      }
    }

    const deletedUsers = await this.usersRepository.listDeletedUsers(before);

    return deletedUsers;
  }

}
