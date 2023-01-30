import { ListPrintPriceByLengthController } from './ListPrintPriceByLengthController';
import { currentPrintPricesRepository } from '../../../repositories';
import { ListPrintPriceByLengthUseCases } from './ListPrintPriceByLengthUseCases';

export function listPrintPriceByLengthFactory() {
  const listPrintPriceByLengthUseCases = new ListPrintPriceByLengthUseCases(currentPrintPricesRepository);
  const listPrintPriceByLengthController = new ListPrintPriceByLengthController(listPrintPriceByLengthUseCases);

  return { useCases: listPrintPriceByLengthUseCases, controller: listPrintPriceByLengthController };
}
