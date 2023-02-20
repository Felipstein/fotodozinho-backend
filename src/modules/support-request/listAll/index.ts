import { currentSupportRequestsRepository } from '../../../repositories';
import { ListSupportRequestsController } from './ListSupportRequestsController';
import { ListSupportRequestsUseCase } from './ListSupportRequestsUseCase';

export function listSupportRequestsFactory() {
  const useCases = new ListSupportRequestsUseCase(currentSupportRequestsRepository);
  const controller = new ListSupportRequestsController(useCases);

  return { useCases, controller };
}
