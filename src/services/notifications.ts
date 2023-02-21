import { INotification } from '../entities/notification/INotification';
import { IUserView } from '../entities/user/IUserView';
import { INotificationsRepository } from '../repositories/notifications/INotificationsRepository';

export class NotificationsService {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async getAll(): Promise<INotification[]> {
    const notifications = await this.notificationsRepository.listAll();

    return notifications;
  }

  async getNotification(id: string): Promise<INotification> {
    const notification = await this.notificationsRepository.listById(id);

    return notification;
  }

  async getNotificationsByUser(user: IUserView): Promise<INotification[]> {
    const notifications = await this.notificationsRepository.listByUserId(user.id);

    return notifications;
  }

  async createNotification(title: string, message: string, user: IUserView): Promise<INotification> {
    const notification = await this.notificationsRepository.create({
      title, message, userId: user.id,
    });

    return notification;
  }

  async updateNotificationRead(id: string, read: boolean): Promise<INotification> {
    const notification = await this.notificationsRepository.updateRead(id, read);

    return notification;
  }

  async deleteNotification(id: string): Promise<void> {
    await this.notificationsRepository.delete(id);
  }

}
