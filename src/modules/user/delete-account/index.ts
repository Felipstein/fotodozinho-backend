import { currentUsersRepository } from '../../../repositories';
import { UserDeleteAccountController } from './UserDeleteAccountController';
import { UserDeleteAccountUseCase } from './UserDeleteAccountUseCase';

export function userDeleteAccountFactory() {
  const useCases = new UserDeleteAccountUseCase(currentUsersRepository);
  const controller = new UserDeleteAccountController(useCases);

  return { useCases, controller };
}
