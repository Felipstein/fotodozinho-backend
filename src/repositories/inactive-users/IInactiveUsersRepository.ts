import { IUserView } from '../../entities/user/IUserView';

export interface IInactiveUsersRepository {

  listAll(): Promise<IUserView[]>;

  listByUserId(userId: string): Promise<IUserView>;

  delete(userId: string): Promise<void>;

}
