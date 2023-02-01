import { IUserCreation } from './../../entities/user/IUserCreation';
import { prisma } from '../../database';
import { IUserView } from '../../entities/user/IUserView';
import { IUsersRepository } from './IUsersRepository';
import { IUserUpdating } from '../../entities/user/IUserUpdating';
import { userViewMapper } from '../../domain/UserViewMapper';


const selectWithoutPassword = {
  id: true,
  name: true,
  email: true,
  phone: true,
  createdAt: true,
  admin: true,
  totalPrints: true,
  totalPrintOrders: true,
  totalPurchases: true
};

export class PrismaUsersRepository implements IUsersRepository {

  async listAll(): Promise<IUserView[]> {
    const users = await prisma.user.findMany({
      select: selectWithoutPassword,
    });

    return users.map(userViewMapper.toDomain);
  }

  async listById(id: string): Promise<IUserView | null> {
    const user = await prisma.user.findFirst({
      where: { id },
      select: selectWithoutPassword,
    });

    if(!user) {
      return null;
    }

    return userViewMapper.toDomain(user);
  }

  async listByEmail(email: string): Promise<IUserView | null> {
    const user = await prisma.user.findFirst({
      where: { email },
      select: selectWithoutPassword,
    });

    if(!user) {
      return null;
    }

    return userViewMapper.toDomain(user);
  }

  async create({ name, email, phone, password, admin }: IUserCreation): Promise<IUserView> {
    const user = await prisma.user.create({
      data: {
        name, email, phone, password, admin
      },
      select: selectWithoutPassword,
    });

    return userViewMapper.toDomain(user);
  }

  async update(id: string, { name, phone, password, admin, totalPrints, totalPrintOrders, totalPurchases }: IUserUpdating): Promise<IUserView | null> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name, phone, password, admin, totalPrints, totalPrintOrders, totalPurchases,
      },
      select: selectWithoutPassword,
    });

    return userViewMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  cleanRepository(): void {}

}
