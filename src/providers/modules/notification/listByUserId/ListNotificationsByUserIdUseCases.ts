import { INotification } from '../../../entities/notification/INotification';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';

export class ListNotificationsByUserIdUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute(userId: string): Promise<INotification[]> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const notifications = await this.notificationsRepository.listByUserId(userId);

    return notifications;
  }

}
