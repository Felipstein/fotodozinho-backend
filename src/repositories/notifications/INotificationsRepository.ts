import { INotification } from '../../entities/notification/INotification';
import { INotificationCreation } from '../../entities/notification/INotificationCreation';
import { INotificationUpdating } from './../../entities/notification/INotificationUpdating';

export interface INotificationsRepository {

  listAll(): Promise<INotification[]>;

  listById(id: string): Promise<INotification>;

  listByUserId(userId: string): Promise<INotification[]>;

  create({ title, message, userId }: INotificationCreation): Promise<INotification>;

  updateRead(id: string, { read }: INotificationUpdating): Promise<INotification>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
