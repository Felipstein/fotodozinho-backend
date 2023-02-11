import { currentShoppingCartsRepository } from '../../../repositories';
import { DeleteShoppingCartProductsController } from './DeleteShoppingCartProductsController';
import { DeleteShoppingCartProductsUseCases } from './DeleteShoppingCartProductsUseCases';

export function deleteShoppingCartProductsFactory() {
  const useCases = new DeleteShoppingCartProductsUseCases(currentShoppingCartsRepository);
  const controller = new DeleteShoppingCartProductsController(useCases);

  return { useCases, controller };
}
