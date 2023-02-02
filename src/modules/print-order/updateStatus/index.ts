import { currentPrintOrdersRepository } from '../../../repositories';
import { UpdatePrintOrderStatusController } from './UpdatePrintOrderStatusController';
import { UpdatePrintOrderStatusUseCases } from './UpdatePrintOrderStatusUseCases';

export function updatePrintOrderStatusFactory() {
  const updatePrintOrderStatusUseCases = new UpdatePrintOrderStatusUseCases(currentPrintOrdersRepository);
  const updatePrintOrderStatusController = new UpdatePrintOrderStatusController(updatePrintOrderStatusUseCases);

  return { useCases: updatePrintOrderStatusUseCases, controller: updatePrintOrderStatusController };
}
