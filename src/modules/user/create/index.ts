import { CreateUserController } from './CreateUserController';
import { currentRepository } from '../../../repositories';
import { CreateUserUseCases } from './CreateUserUseCases';

export function createUserFactory() {
  const createUserUseCases = new CreateUserUseCases(currentRepository);
  const createUserController = new CreateUserController(createUserUseCases);

  return { useCases: createUserUseCases, controller: createUserController };
}
