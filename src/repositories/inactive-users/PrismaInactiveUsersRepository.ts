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

}
