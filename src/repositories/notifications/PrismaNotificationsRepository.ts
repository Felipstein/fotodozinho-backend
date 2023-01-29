import { prisma } from '../../database';
import { INotification } from '../../entities/notification/INotification';
import { INotificationCreation } from '../../entities/notification/INotificationCreation';
import { INotificationUpdating } from '../../entities/notification/INotificationUpdating';
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

  create({ title, message, userId }: INotificationCreation): Promise<INotification> {
    return prisma.notification.create({
      data: { title, message, userId }
    });
  }

  updateRead(id: string, { read }: INotificationUpdating): Promise<INotification> {
    return prisma.notification.update({
      where: { id },
      data: { read },
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
