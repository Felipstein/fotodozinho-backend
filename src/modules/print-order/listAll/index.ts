import { currentPrintOrdersRepository } from '../../../repositories';
import { ListPrintOrdersController } from './ListPrintOrdersController';
import { ListPrintOrdersUseCases } from './ListPrintOrdersUseCases';

export function listPrintOrdersFactory() {
  const listPrintOrdersUseCases = new ListPrintOrdersUseCases(currentPrintOrdersRepository);
  const listPrintOrdersController = new ListPrintOrdersController(listPrintOrdersUseCases);

  return { useCases: listPrintOrdersUseCases, controller: listPrintOrdersController };
}
