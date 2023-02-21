import { INotification } from '../../../entities/notification/INotification';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { NotificationsService } from '../../../services/notifications';

export class ListNotificationsByUserIdUseCases {

  constructor(
    private notificationsService: NotificationsService,
    private usersRepository: IUsersRepository,
  ) { }

  async execute(userId: string): Promise<INotification[]> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const notifications = await this.notificationsService.getNotificationsByUser(user);

    return notifications;
  }

}
