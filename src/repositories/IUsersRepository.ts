import { IUser } from './../entities/IUser';
import { IUserView } from './../entities/IUserView';

export interface IUsersRepository {

  listAll(): Promise<IUserView[]>;

  listById(id: string): Promise<IUserView | null>;

  listByEmail(email: string): Promise<IUserView | null>;

  create({ name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView>;

  update(id: string, { name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView | null>;

  delete(id: string): void;

}
