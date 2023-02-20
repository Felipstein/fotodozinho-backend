import { currentSupportRequestsRepository } from '../../../repositories';
import { SupportRequestCreateController } from './SupportRequestCreateController';
import { SupportRequestCreateUseCase } from './SupportRequestCreateUseCase';

export function supportRequestCreateFactory() {
  const useCases = new SupportRequestCreateUseCase(currentSupportRequestsRepository);
  const controller = new SupportRequestCreateController(useCases);

  return { useCases, controller };
}
