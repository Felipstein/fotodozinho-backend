import { currentSupportRequestsRepository } from '../../../repositories';
import { DeleteSupportRequestController } from './DeleteSupportRequestController';
import { DeleteSupportRequestUseCase } from './DeleteSupportRequestUseCase';

export function deleteSupportRequestFactory() {
  const useCases = new DeleteSupportRequestUseCase(currentSupportRequestsRepository);
  const controller = new DeleteSupportRequestController(useCases);

  return { useCases, controller };
}
