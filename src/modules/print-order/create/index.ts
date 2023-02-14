import { currentPrintOrdersRepository, currentUsersRepository } from '../../../repositories';
import { CreatePrintOrderController } from './CreatePrintOrderController';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

export function createPrintOrderFactory() {
  const createPrintOrderUseCases = new CreatePrintOrderUseCases(currentPrintOrdersRepository, currentUsersRepository);
  const createPrintOrderController = new CreatePrintOrderController(createPrintOrderUseCases);

  return { useCases: createPrintOrderUseCases, controller: createPrintOrderController };
}
