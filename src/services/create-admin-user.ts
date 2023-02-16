import { crypt } from '../providers/Crypt';
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

    const password = EnvProvider.adminPassword;
    if(!password) {
      throw new Error('Admin passwod has not been set');
    }

    const encryptedPassword = await crypt.hash(password);

    await this.usersRepository.create({
      name: 'Admin',
      email: 'admin@admin',
      password: encryptedPassword,
      admin: true,
    }, false);

    return 'CREATED';
  }

}
