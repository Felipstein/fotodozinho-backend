import { currentPrintPricesRepository } from '../../../repositories';
import { ListPrintPricesController } from './ListPrintPricesController';
import { ListPrintPricesUseCases } from './ListPrintPricesUseCases';

export function listPrintPricesFactory() {
  const listPrintPricesUseCases = new ListPrintPricesUseCases(currentPrintPricesRepository);
  const listPrintPricesController = new ListPrintPricesController(listPrintPricesUseCases);

  return { useCases: listPrintPricesUseCases, controller: listPrintPricesController };
}
