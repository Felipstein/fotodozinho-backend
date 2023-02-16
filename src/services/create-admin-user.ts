import { IUsersRepository } from '../repositories/users/IUsersRepository';
import { EnvProvider } from './env-provider';

export type AdminCreateResponse = 'CREATED' | 'ALREADY_EXISTS'

export class CreateAdminUserIfNotExistsService {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(): Promise<AdminCreateResponse> {
    const user = await this.usersRepository.listByEmail('admin@admin');

    if(user) {
      return 'ALREADY_EXISTS';
    }

    await this.usersRepository.create({
      name: 'Admin',
      email: 'admin@admin',
      password: EnvProvider.adminPassword,
      admin: true,
    }, false);

    return 'CREATED';
  }

}
