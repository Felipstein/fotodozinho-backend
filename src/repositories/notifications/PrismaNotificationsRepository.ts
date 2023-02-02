import { prisma } from '../../database';
import { NotificationCreateRequest } from '../../entities/notification/dtos/NotificationCreateRequest';
import { INotification } from '../../entities/notification/INotification';
import { INotificationsRepository } from './INotificationsRepository';

export class PrismaNotificationsRepository implements INotificationsRepository {

  listAll(): Promise<INotification[]> {
    return prisma.notification.findMany();
  }

  listById(id: string): Promise<INotification> {
    return prisma.notification.findFirst({ where: { id } });
  }

  listByUserId(userId: string): Promise<INotification[]> {
    return prisma.notification.findMany({ where: { userId } });
  }

  create({ title, message, userId }: NotificationCreateRequest): Promise<INotification> {
    return prisma.notification.create({
      data: { title, message, userId }
    });
  }

  updateRead(id: string, isRead: boolean): Promise<INotification> {
    return prisma.notification.update({
      where: { id },
      data: { read: isRead },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.notification.delete({
      where: { id }
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.notification.deleteMany({
      where: { userId },
    });
  }

  cleanRepository(): void {}

}
