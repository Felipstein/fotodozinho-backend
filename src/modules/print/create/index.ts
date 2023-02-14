import { currentColorsRepository, currentPrintOrdersRepository, currentPrintPricesRepository, currentPrintsRepository } from '../../../repositories';
import { CreatePrintController } from './CreatePrintController';
import { CreatePrintUseCases } from './CreatePrintUseCases';

export function createPrintFactory() {
  const useCases = new CreatePrintUseCases(currentPrintsRepository, currentPrintOrdersRepository, currentColorsRepository, currentPrintPricesRepository);
  const controller = new CreatePrintController(useCases);

  return { useCases, controller };
}
