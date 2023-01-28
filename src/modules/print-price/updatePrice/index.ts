import { UpdatePricePrintPriceController } from './UpdatePricePrintPriceController';
import { currentPrintPricesRepository } from '../../../repositories';
import { UpdatePricePrintPriceUseCases } from './UpdatePricePrintPriceUseCases';

export function updatePricePrintPriceFactory() {
  const updatePricePrintPriceUseCases = new UpdatePricePrintPriceUseCases(currentPrintPricesRepository);
  const updatePricePrintPriceController = new UpdatePricePrintPriceController(updatePricePrintPriceUseCases);

  return { useCases: updatePricePrintPriceUseCases, controller: updatePricePrintPriceController };
}
