import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

export class DeleteUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    this.usersRepository.delete(id);
  }

}
