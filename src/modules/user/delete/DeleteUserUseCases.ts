import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { validatorTokenProvider } from '../../../providers/ValidatorToken';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class DeleteUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const user = await this.usersRepository.listById(id);
    if(!user) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.delete(id);

    const validatorTokenExists = await validatorTokenProvider.getValidatorToken(user.email);
    if(validatorTokenExists) {
      await validatorTokenProvider.delete({ id });
    }
  }

}
