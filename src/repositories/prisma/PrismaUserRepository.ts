import { IUserCreation } from './../../entities/IUserCreation';
import { prisma } from '../../database';
import { IUserView } from '../../entities/IUserView';
import { IUsersRepository } from './../IUsersRepository';

export class PrismaUserRepository implements IUsersRepository {

  listAll(): Promise<IUserView[]> {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, createdAt: true, admin: true },
    });
  }

  listById(id: string): Promise<IUserView | null> {
    return prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, createdAt: true, admin: true },
    });
  }

  listByEmail(email: string): Promise<IUserView | null> {
    return prisma.user.findFirst({
      where: { email },
      select: { id: true, name: true, email: true, phone: true, createdAt: true, admin: true },
    });
  }

  create({ name, email, phone, password }: IUserCreation): Promise<IUserView> {
    return prisma.user.create({
      data: {
        name, email, phone, password,
      },
      select: {
        id: true, name: true, email: true, phone: true, createdAt: true, admin: true
      }
    });
  }

  update(id: string, { name, email, phone, password }: IUserCreation): Promise<IUserView | null> {
    return prisma.user.update({
      where: { id },
      data: {
        name, email, phone, password,
      },
      select: {
        id: true, name: true, email: true, phone: true, createdAt: true, admin: true
      },
    });
  }

  delete(id: string): void {
    prisma.user.delete({ where: { id } });
  }

}
