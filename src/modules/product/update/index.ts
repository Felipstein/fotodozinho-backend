import { currentProductCategoriesRepository, currentProductsRepository } from '../../../repositories';
import { UpdateProductController } from './UpdateProductController';
import { UpdateProductUseCases } from './UpdateProductUseCases';

export function updateProductFactory() {
  const useCases = new UpdateProductUseCases(currentProductsRepository, currentProductCategoriesRepository);
  const controller = new UpdateProductController(useCases);

  return { useCases, controller };
}
