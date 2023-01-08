import { IUser } from './../entities/IUser';

export interface IUsersRepository {

  listAll(): Promise<IUser[]>;

  listById(id: string): Promise<IUser | null>;

  listByEmail(email: string): Promise<IUser | null>;

  create({ name, email, password }: Omit<IUser, 'id'>): Promise<IUser>;

  update(id: string, { name, email, password }: Omit<IUser, 'id'>): Promise<IUser>;

  delete(id: string): Promise<IUser>;

}
