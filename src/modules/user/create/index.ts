import { currentUsersRepository } from '../../../repositories';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCases } from './CreateUserUseCases';

export function createUserFactory() {
  const createUserUseCases = new CreateUserUseCases(currentUsersRepository);
  const createUserController = new CreateUserController(createUserUseCases);

  return { useCases: createUserUseCases, controller: createUserController };
}
