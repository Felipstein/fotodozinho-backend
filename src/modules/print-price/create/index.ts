import { currentPrintPricesRepository } from '../../../repositories';
import { CreatePrintPriceController } from './CreatePrintPriceController';
import { CreatePrintPriceUseCases } from './CreatePrintPriceUseCases';

export function createPrintPriceFactory() {
  const createPrintPriceUseCases = new CreatePrintPriceUseCases(currentPrintPricesRepository);
  const createPrintPriceController = new CreatePrintPriceController(createPrintPriceUseCases);

  return { useCases: createPrintPriceUseCases, controller: createPrintPriceController };
}
