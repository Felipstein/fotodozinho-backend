import { currentShoppingCartsRepository, currentUsersRepository } from '../../../repositories';
import { ListShoppingCartByUserIdController } from './ListShoppingCartByUserIdController';
import { ListShoppingCartByUserIdUseCases } from './ListShoppingCartByUserIdUseCases';

export function ListShoppingCartByUserIdFactory() {
  const useCases = new ListShoppingCartByUserIdUseCases(currentShoppingCartsRepository, currentUsersRepository);
  const controller = new ListShoppingCartByUserIdController(useCases);

  return { useCases, controller };
}
