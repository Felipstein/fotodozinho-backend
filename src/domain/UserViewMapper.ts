import { User } from '@prisma/client';
import { IUserView } from '../entities/user/IUserView';
import { IUserPublic } from '../entities/user/IUserPublic';

type UserViewDomain = IUserView;
type UserViewPersistence = Omit<User, 'password'>;
type UserPublic = IUserPublic;

class UserViewMapper {

  toDomain(persistenceUserView: UserViewPersistence): UserViewDomain {
    return {
      ...persistenceUserView,
      totalPrints: Number(persistenceUserView.totalPrints),
      totalPrintOrders: Number(persistenceUserView.totalPrintOrders),
      totalPurchases: Number(persistenceUserView.totalPurchases),
      totalPurchaseOrders: Number(persistenceUserView.totalPurchaseOrders),
    };
  }

  toPublic(viewPublic: UserViewDomain): UserPublic {
    return {
      id: viewPublic.id,
      name: viewPublic.name,
      email: viewPublic.email,
      phone: viewPublic.phone,
      createdAt: viewPublic.createdAt,
      totalPrintOrders: viewPublic.totalPrintOrders,
      totalPrints: viewPublic.totalPrints,
      totalPurchaseOrders: viewPublic.totalPurchaseOrders,
      totalPurchases: viewPublic.totalPurchases,
    };
  }

}

const userViewMapper = new UserViewMapper();

export { userViewMapper };
