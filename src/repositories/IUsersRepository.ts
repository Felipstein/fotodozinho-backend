import { IUserCreation } from '../entities/IUserCreation';
import { IUserUpdating } from '../entities/IUserUpdating';
import { IUserView } from './../entities/IUserView';

export interface IUsersRepository {

  listAll(): Promise<IUserView[]>;

  listById(id: string): Promise<IUserView | null>;

  listByEmail(email: string): Promise<IUserView | null>;

  create({ name, email, phone, password, admin }: IUserCreation, isTest: boolean): Promise<IUserView>;

  update(id: string, { name, phone, password, admin }: IUserUpdating): Promise<IUserView | null>;

  delete(id: string): void;

}
