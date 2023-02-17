import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class ListUserByEmailUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(email: string, userIdRequesting: string): Promise<IUserView> {
    if(!email) {
      throw new BadRequestError('E-mail é obrigatório');
    }

    const user = await this.usersRepository.listByEmail(email);
    if(!user) {
      throw new UserNotFoundError();
    }

    await verifyUserAuth.execute({ id: userIdRequesting }, user.id);

    return user;
  }

}
