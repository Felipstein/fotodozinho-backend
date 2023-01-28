import { currentPrintPricesRepository } from '../../../repositories';
import { DeletePrintPriceController } from './DeletePrintPriceController';
import { DeletePrintPriceUseCases } from './DeletePrintPriceUseCases';

export function deletePrintPriceFactory() {
  const deletePrintPriceUseCases = new DeletePrintPriceUseCases(currentPrintPricesRepository);
  const deletePrintPriceController = new DeletePrintPriceController(deletePrintPriceUseCases);

  return { useCases: deletePrintPriceUseCases, controller: deletePrintPriceController };
}
