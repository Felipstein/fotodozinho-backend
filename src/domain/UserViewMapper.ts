import { User } from '@prisma/client';
import { IUserView } from '../entities/user/IUserView';

type UserViewDomain = IUserView;
type UserViewPersistence = Omit<User, 'password'>;

class UserViewMapper {

  toDomain(persistenceUserView: UserViewPersistence): UserViewDomain {
    return {
      ...persistenceUserView,
      totalPrints: Number(persistenceUserView.totalPrints),
      totalPurchases: Number(persistenceUserView.totalPurchases),
    };
  }

}

const userViewMapper = new UserViewMapper();

export { userViewMapper };
