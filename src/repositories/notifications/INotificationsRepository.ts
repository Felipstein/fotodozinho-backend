import { NotificationCreateRequest } from '../../entities/notification/dtos/NotificationCreateRequest';
import { INotification } from '../../entities/notification/INotification';

export interface INotificationsRepository {

  listAll(): Promise<INotification[]>;

  listById(id: string): Promise<INotification>;

  listByUserId(userId: string): Promise<INotification[]>;

  create({ title, message, userId }: NotificationCreateRequest): Promise<INotification>;

  updateRead(id: string, isRead: boolean): Promise<INotification>;

  delete(id: string): Promise<void>;

  deleteByUserId(userId: string): Promise<void>;

  cleanRepository(): void;

}
