import { currentProductsRepository, currentShoppingCartsRepository } from '../../../repositories';
import { AddShoppingCartProductController } from './AddShoppingCartProductController';
import { AddShoppingCartProductUseCases } from './AddShoppingCartProductUseCases';

export function addShoppingCartProductFactory() {
  const useCases = new AddShoppingCartProductUseCases(currentShoppingCartsRepository, currentProductsRepository);
  const controller = new AddShoppingCartProductController(useCases);

  return { useCases, controller };
}
