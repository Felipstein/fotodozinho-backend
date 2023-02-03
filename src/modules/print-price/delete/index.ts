import { currentPrintPricesRepository, currentPrintsRepository } from '../../../repositories';
import { DeletePrintPriceController } from './DeletePrintPriceController';
import { DeletePrintPriceUseCases } from './DeletePrintPriceUseCases';

export function deletePrintPriceFactory() {
  const deletePrintPriceUseCases = new DeletePrintPriceUseCases(currentPrintPricesRepository, currentPrintsRepository);
  const deletePrintPriceController = new DeletePrintPriceController(deletePrintPriceUseCases);

  return { useCases: deletePrintPriceUseCases, controller: deletePrintPriceController };
}
