import { currentShoppingCartsRepository } from '../../../repositories';
import { ListShoppingCartsController } from './ListShoppingCartsController';
import { ListShoppingCartsUseCases } from './ListShoppingCartsUseCases';

export function listShoppingCartsFactory() {
  const useCases = new ListShoppingCartsUseCases(currentShoppingCartsRepository);
  const controller = new ListShoppingCartsController(useCases);

  return { useCases, controller };
}
