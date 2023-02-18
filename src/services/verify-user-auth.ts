import { IUser } from '../entities/user/IUser';
import { IUserView } from '../entities/user/IUserView';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { currentUsersRepository } from '../repositories';
import { IUsersRepository } from '../repositories/users/IUsersRepository';

export class VerifyUserAuthService {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async ensureSelfAction(userRequestingReference: { id?: string, user?: IUser | IUserView }, userIdAction: string) {
    if(!userRequestingReference?.id && !userRequestingReference?.user) {
      throw new UnauthorizedError();
    }

    let userRequesting: IUser | IUserView;

    if(userRequestingReference.user) {
      userRequesting = userRequestingReference.user;
    } else {
      userRequesting = await this.usersRepository.listById(userRequestingReference.id);
    }

    if(!userRequesting) {
      throw new UnauthorizedError();
    }

    if(userRequesting.admin) {
      return;
    }

    if(userRequestingReference.id !== userIdAction) {
      throw new ForbiddenError();
    }
  }

  async ensureAdminUser(userRequestingId: string) {
    if(!userRequestingId) {
      throw new UnauthorizedError();
    }

    const user = await currentUsersRepository.listById(userRequestingId);
    if(!user) {
      throw new UnauthorizedError();
    }

    if(!user.admin) {
      throw new ForbiddenError();
    }
  }

}

const verifyUserAuth = new VerifyUserAuthService(currentUsersRepository);

export { verifyUserAuth };
