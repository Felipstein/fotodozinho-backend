import { CreateUserController } from './CreateUserController';
import { currentUserRepository } from '../../../repositories';
import { CreateUserUseCases } from './CreateUserUseCases';

export function createUserFactory() {
  const createUserUseCases = new CreateUserUseCases(currentUserRepository);
  const createUserController = new CreateUserController(createUserUseCases);

  return { useCases: createUserUseCases, controller: createUserController };
}
