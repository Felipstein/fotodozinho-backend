import { currentProductsRepository } from '../../../repositories';
import { DeleteProductController } from './DeleteProductController';
import { DeleteProductUseCases } from './DeleteProductUseCases';

export function deleteProductFactory() {
  const useCases = new DeleteProductUseCases(currentProductsRepository);
  const controller = new DeleteProductController(useCases);

  return { useCases, controller };
}
