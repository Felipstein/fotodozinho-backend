import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class DeleteUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const userExists = await this.usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.update(id, { deletedAt: new Date() }, false);
  }

}
