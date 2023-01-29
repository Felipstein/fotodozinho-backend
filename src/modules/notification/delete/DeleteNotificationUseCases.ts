import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';

export class DeleteNotificationUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const notification = await this.notificationsRepository.listById(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    await this.notificationsRepository.delete(id);
  }

}
