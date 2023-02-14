import { currentPrintOrdersRepository, currentPrintsRepository } from '../../../repositories';
import { CreatePrintController } from './CreatePrintController';
import { CreatePrintUseCases } from './CreatePrintUseCases';

export function createPrintFactory() {
  const useCases = new CreatePrintUseCases(currentPrintsRepository, currentPrintOrdersRepository);
  const controller = new CreatePrintController(useCases);

  return { useCases, controller };
}
