import { IUser } from './../entities/User';

export interface IUsersRepository {

  listAll(): Promise<IUser>;

  listById(id: string): Promise<IUser | undefined>;

  listByEmail(email: string): Promise<IUser | undefined>;

  create({ name, email, password }: Omit<IUser, 'id'>): Promise<IUser>;

  update(id: string, { name, email, password }: Omit<IUser, 'id'>): Promise<IUser>;

  delete(id: string): Promise<IUser>;

}
