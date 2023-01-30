import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ListUserByEmailUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(email: string): Promise<IUserView> {
    if(!email) {
      throw new BadRequestError('E-mail é obrigatório');
    }

    const user = await this.usersRepository.listByEmail(email);
    if(!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

}
