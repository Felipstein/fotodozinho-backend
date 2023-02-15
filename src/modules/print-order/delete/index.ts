import { currentPrintOrdersRepository, currentPrintsRepository } from '../../../repositories';
import { DeletePrintOrderController } from './DeletePrintOrderController';
import { DeletePrintOrderUseCases } from './DeletePrintOrderUseCases';

export function deletePrintOrderFactory() {
  const deletePrintOrderUseCases = new DeletePrintOrderUseCases(currentPrintOrdersRepository, currentPrintsRepository);
  const deletePrintOrderController = new DeletePrintOrderController(deletePrintOrderUseCases);

  return { useCases: deletePrintOrderUseCases, controller: deletePrintOrderController };
}
