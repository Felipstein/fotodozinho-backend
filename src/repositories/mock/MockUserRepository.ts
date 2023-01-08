import { cloneDeep } from 'lodash';

import { IUser } from '../../entities/IUser';
import { uuidProvider } from '../../providers/UUID';
import { IUsersRepository } from '../IUsersRepository';
import { IUserView } from './../../entities/IUserView';

export class MockUserRepository implements IUsersRepository {

  private readonly users: IUserView[];

  async listAll(): Promise<IUserView[]> {
    return this.users;
  }

  async listById(id: string): Promise<IUserView | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  async listByEmail(email: string): Promise<IUserView | null> {
    return this.users.find(user => user.email === email) ?? null;
  }

  async create({ name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView> {
    const id = uuidProvider.generateCUID();
    const user = { id, name, email, phone, password };

    this.users.push(user);

    const userWithoutPass = cloneDeep(user);
    delete userWithoutPass.password;

    return userWithoutPass;
  }

  async update(id: string, { name, email, password }: Omit<IUser, 'id'>): Promise<IUserView | null> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): void {
    throw new Error('Method not implemented.');
  }
}
