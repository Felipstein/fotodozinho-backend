import { prisma } from '../../database';
import { IUserView } from '../../entities/user/IUserView';
import { IUsersRepository } from './IUsersRepository';
import { userViewMapper } from '../../domain/UserViewMapper';
import { UserCreateRequest } from '../../entities/user/dtos/UserCreateRequest';
import { UserUpdateRequest } from '../../entities/user/dtos/UserUpdateRequest';


const selectWithoutPassword = {
  id: true,
  name: true,
  email: true,
  phone: true,
  createdAt: true,
  admin: true,
  totalPrints: true,
  totalPrintOrders: true,
  totalPurchases: true,
  totalPurchaseOrders: true,
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

  async listByEmail(email: string, withPassword = false): Promise<(IUserView & { password?: string }) | null> {
    let user;

    if(withPassword) {
      user = await prisma.user.findFirst({ where: { email } });
    } else {
      user = await prisma.user.findFirst({
        where: { email },
        select: selectWithoutPassword,
      });
    }

    if(!user) {
      return null;
    }

    const userMapped = userViewMapper.toDomain(user);

    // @ts-ignore
    return withPassword ? { ...userMapped, password: user.password } : userMapped;
  }

  async create({ name, email, phone, password, admin }: UserCreateRequest): Promise<IUserView> {
    const user = await prisma.user.create({
      data: {
        name, email, phone, password, admin
      },
      select: selectWithoutPassword,
    });

    return userViewMapper.toDomain(user);
  }

  async update(id: string, { name, phone, password, admin, totalPrints, totalPrintOrders, totalPurchases, totalPurchaseOrders }: UserUpdateRequest): Promise<IUserView | null> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name, phone, password, admin, totalPrints, totalPrintOrders, totalPurchases, totalPurchaseOrders
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
