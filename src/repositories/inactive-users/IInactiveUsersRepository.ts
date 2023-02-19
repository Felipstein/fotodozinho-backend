import { IUserView } from '../../entities/user/IUserView';

export interface IInactiveUsersRepository {

  listAll(): Promise<IUserView[]>;

}
