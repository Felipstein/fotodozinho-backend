import { INotification } from '../../entities/notification/INotification';
import { INotificationCreation } from '../../entities/notification/INotificationCreation';
import { uuidProvider } from '../../providers/UUID';
import { INotificationsRepository } from './INotificationsRepository';

export class MockNotificationsRepository implements INotificationsRepository {

  private notifications: INotification[] = [];

  async listAll(): Promise<INotification[]> {
    return [...this.notifications];
  }

  async listById(id: string): Promise<INotification> {
    return this.notifications.find(notification => notification.id === id);
  }

  async listByUserId(userId: string): Promise<INotification[]> {
    return this.notifications.filter(notification => notification.userId === userId);
  }

  async create({ title, message, userId }: INotificationCreation): Promise<INotification> {
    const id = uuidProvider.generateCUID();
    const date = new Date();

    const notification: INotification = {
      id,
      title,
      message,
      read: false,
      userId,
      createdAt: date
    };

    this.notifications.push(notification);

    return notification;
  }

  async updateRead(id: string, isRead: boolean): Promise<INotification> {
    let notificationUpdated: INotification;

    this.notifications = this.notifications.map(notification => {
      if(notification.id === id) {
        return notificationUpdated = { ...notification, read: isRead };
      }

      return notification;
    });

    return notificationUpdated;
  }

  async delete(id: string): Promise<void> {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.notifications = this.notifications.filter(notification => notification.userId !== userId);
  }

  cleanRepository(): void {
    this.notifications = [];
  }

}
