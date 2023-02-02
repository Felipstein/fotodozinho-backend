import { currentPrintOrdersRepository } from '../../../repositories';
import { ListPrintOrderByIdController } from './ListPrintOrderByIdController';
import { ListPrintOrderByIdUseCases } from './ListPrintOrderByIdUseCases';

export function listPrintOrderByIdFactory() {
  const listPrintOrderByIdUseCases = new ListPrintOrderByIdUseCases(currentPrintOrdersRepository);
  const listPrintOrderByIdController = new ListPrintOrderByIdController(listPrintOrderByIdUseCases);

  return { useCases: listPrintOrderByIdUseCases, controller: listPrintOrderByIdController };
}
