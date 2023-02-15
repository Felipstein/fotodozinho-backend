import { currentPrintsRepository } from '../../../repositories';
import { ListPrintsController } from './ListPrintsController';
import { ListPrintsUseCases } from './ListPrintsUseCases';

export function listPrintsFactory() {
  const useCases = new ListPrintsUseCases(currentPrintsRepository);
  const controller = new ListPrintsController(useCases);

  return { useCases, controller };
}
