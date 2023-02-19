import { IUserView } from '../../entities/user/IUserView';

export interface IInactiveUsersRepository {

  listAll(): Promise<IUserView[]>;

  delete(userId: string): Promise<void>;

}
