import { prisma } from '../../database';
import { IUser } from '../../entities/IUser';
import { IUsersRepository } from './../IUsersRepository';

export class PrismaUserRepository implements IUsersRepository {

  listAll(): Promise<IUser[]> {
    return prisma.user.findMany();
  }

  listById(id: string): Promise<IUser | null> {
    return prisma.user.findFirst({ where: { id } });
  }

  listByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findFirst({ where: { email } });
  }

  create({ name, email, password }: Omit<IUser, 'id'>): Promise<IUser> {
    const user = prisma.user.create({
      data: {
        name, email, password,
      },
      select: {
        id: true, name: true, email: true,
      }
    });

    return user;
  }

  update(id: string, { name, email, password }: Omit<IUser, 'id'>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

}
