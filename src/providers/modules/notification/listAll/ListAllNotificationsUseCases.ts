import { INotification } from '../../../entities/notification/INotification';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';

export class ListAllNotificationsUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(): Promise<INotification[]> {
    const notifications = await this.notificationsRepository.listAll();

    return notifications;
  }

}
