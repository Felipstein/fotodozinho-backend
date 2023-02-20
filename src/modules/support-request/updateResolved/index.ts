import { currentSupportRequestsRepository } from '../../../repositories';
import { UpdateSupportRequestController } from './UpdateSupportRequestController';
import { UpdateSupportRequestResolvedUseCase } from './UpdateSupportRequestUseCase';

export function updateSupportRequestFactory() {
  const useCases = new UpdateSupportRequestResolvedUseCase(currentSupportRequestsRepository);
  const controller = new UpdateSupportRequestController(useCases);

  return { useCases, controller };
}
