import { prisma } from '../../database';
import { inactiveUserMapper } from '../../domain/InactiveUserMapper';
import { IUserView } from '../../entities/user/IUserView';
import { selectWithoutPassword } from '../users/PrismaUsersRepository';
import { IInactiveUsersRepository } from './IInactiveUsersRepository';

export class PrismaInactiveUsersRepository implements IInactiveUsersRepository {

  async listAll(): Promise<IUserView[]> {
    const users = await prisma.inactiveUser.findMany({
      include: {
        user: { select: selectWithoutPassword },
      }
    });

    return users.map(inactiveUserMapper.toDomain);
  }

  async listByUserId(userId: string): Promise<IUserView> {
    const user = await prisma.inactiveUser.findFirst({
      where: { userId },
      include: {
        user: { select: selectWithoutPassword },
      },
    });

    if(!user) {
      return null;
    }

    return inactiveUserMapper.toDomain(user);
  }

  async delete(userId: string): Promise<void> {
    await prisma.inactiveUser.delete({
      where: { userId },
    });
  }

}
