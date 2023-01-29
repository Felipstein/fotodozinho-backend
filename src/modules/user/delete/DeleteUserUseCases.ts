import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class DeleteUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const userExists = await this.usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    await this.notificationsRepository.deleteByUserId(id);
    await this.usersRepository.delete(id);
  }

}
