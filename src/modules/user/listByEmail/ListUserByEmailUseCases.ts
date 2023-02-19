import { userViewMapper } from '../../../domain/UserViewMapper';
import { IUserPublic } from '../../../entities/user/IUserPublic';
import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class ListUserByEmailUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(email: string, userIdRequesting: string, isAdmin = false): Promise<IUserView | IUserPublic> {
    if(!email) {
      throw new BadRequestError('E-mail é obrigatório');
    }

    const user = await this.usersRepository.listByEmail(email);
    if(!user) {
      throw new UserNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: userIdRequesting }, user.id);

    return isAdmin ? user : userViewMapper.toPublic(user);
  }

}
