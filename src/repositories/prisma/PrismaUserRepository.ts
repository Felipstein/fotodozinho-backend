import { prisma } from '../../database';
import { IUser } from '../../entities/IUser';
import { IUserView } from '../../entities/IUserView';
import { IUsersRepository } from './../IUsersRepository';

export class PrismaUserRepository implements IUsersRepository {

  listAll(): Promise<IUserView[]> {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true },
    });
  }

  listById(id: string): Promise<IUserView | null> {
    return prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true, phone: true },
    });
  }

  listByEmail(email: string): Promise<IUserView | null> {
    return prisma.user.findFirst({
      where: { email },
      select: { id: true, name: true, email: true, phone: true },
    });
  }

  create({ name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView> {
    return prisma.user.create({
      data: {
        name, email, phone, password,
      },
      select: {
        id: true, name: true, email: true, phone: true,
      }
    });
  }

  update(id: string, { name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView | null> {
    return prisma.user.update({
      where: { id },
      data: {
        name, email, phone, password,
      },
      select: {
        id: true, name: true, email: true, phone: true,
      },
    });
  }

  delete(id: string): void {
    prisma.user.delete({ where: { id } });
  }

}
