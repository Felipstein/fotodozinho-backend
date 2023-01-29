import { INotification } from '../../entities/notification/INotification';
import { INotificationCreation } from '../../entities/notification/INotificationCreation';

export interface INotificationsRepository {

  listAll(): Promise<INotification[]>;

  listById(id: string): Promise<INotification>;

  listByUserId(userId: string): Promise<INotification[]>;

  create({ title, message, userId }: INotificationCreation): Promise<INotification>;

  updateRead(id: string, isRead: boolean): Promise<INotification>;

  delete(id: string): Promise<void>;

  deleteByUserId(userId: string): Promise<void>;

  cleanRepository(): void;

}
