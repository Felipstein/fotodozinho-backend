import { currentProductsRepository } from '../../../repositories';
import { ListProductsController } from './ListProductsController';
import { ListProductsUseCases } from './ListProductsUseCases';

export function listProductsFactory() {
  const useCases = new ListProductsUseCases(currentProductsRepository);
  const controller = new ListProductsController(useCases);

  return { useCases, controller };
}
