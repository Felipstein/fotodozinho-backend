import { IUserCreation } from '../../entities/user/IUserCreation';
import { IUserUpdating } from '../../entities/user/IUserUpdating';
import { IUserView } from '../../entities/user/IUserView';

export interface IUsersRepository {

  listAll(): Promise<IUserView[]>;

  listById(id: string): Promise<IUserView | null>;

  listByEmail(email: string): Promise<IUserView | null>;

  create({ name, email, phone, password, admin }: IUserCreation, isTest: boolean): Promise<IUserView>;

  update(id: string, { name, phone, password, admin }: IUserUpdating, isTest: boolean): Promise<IUserView | null>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
