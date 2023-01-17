import { IUserView } from '../../../entities/IUserView';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { UpdateUserDTO } from './UpdateUserDTO';

export class UpdateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string, { name, phone, password, admin }: UpdateUserDTO): Promise<IUserView> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const userExists = await this.usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const userUpdated = await this.usersRepository.update(id, { name, phone, password, admin });
  }

}
