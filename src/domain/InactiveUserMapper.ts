import { InactiveUser, User } from '@prisma/client';
import { IUserView } from '../entities/user/IUserView';

type InactiveUserDomain = IUserView;
type InactiveUserPersistence = InactiveUser & { user: Omit<User, 'password'> };

class InactiveUserMapper {

  toDomain(inactiveUserPersistence: InactiveUserPersistence): InactiveUserDomain {
    return {
      id: inactiveUserPersistence.user.id,
      name: inactiveUserPersistence.user.name,
      email: inactiveUserPersistence.user.email,
      phone: inactiveUserPersistence.user.phone,
      admin: inactiveUserPersistence.user.admin,
      createdAt: inactiveUserPersistence.user.createdAt,
      lastLogin: inactiveUserPersistence.user.lastLogin,
      deletedAt: inactiveUserPersistence.user.deletedAt,
      totalPrintOrders: Number(inactiveUserPersistence.user.totalPrintOrders),
      totalPrints: Number(inactiveUserPersistence.user.totalPrints),
      totalPurchaseOrders: Number(inactiveUserPersistence.user.totalPurchaseOrders),
      totalPurchases: Number(inactiveUserPersistence.user.totalPurchases),
    };
  }

}

const inactiveUserMapper = new InactiveUserMapper();

export { inactiveUserMapper };
