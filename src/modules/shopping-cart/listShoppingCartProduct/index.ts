import { currentShoppingCartsRepository } from '../../../repositories';
import { ListShoppingCartProductController } from './ListShoppingCartProductController';
import { ListShoppingCartProductUseCases } from './ListShoppingCartProductUseCases';

export function listShoppingCartProductFactory() {
  const useCases = new ListShoppingCartProductUseCases(currentShoppingCartsRepository);
  const controller = new ListShoppingCartProductController(useCases);

  return { useCases, controller };
}
