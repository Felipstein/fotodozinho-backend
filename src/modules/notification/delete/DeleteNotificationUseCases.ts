import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class DeleteNotificationUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(id: string, requestingUserId: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const notification = await this.notificationsRepository.listById(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, notification.userId);

    await this.notificationsRepository.delete(id);
  }

}
