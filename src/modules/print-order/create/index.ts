import { currentColorsRepository, currentPrintOrdersRepository, currentPrintPricesRepository, currentPrintsRepository, currentUsersRepository } from '../../../repositories';
import { CreatePrintOrderController } from './CreatePrintOrderController';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

export function createPrintOrderFactory() {
  const createPrintOrderUseCases = new CreatePrintOrderUseCases(
    currentPrintOrdersRepository,
    currentUsersRepository,
    currentPrintPricesRepository,
    currentPrintsRepository,
    currentColorsRepository,
  );
  const createPrintOrderController = new CreatePrintOrderController(createPrintOrderUseCases);

  return { useCases: createPrintOrderUseCases, controller: createPrintOrderController };
}
