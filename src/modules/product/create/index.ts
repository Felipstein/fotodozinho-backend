import { currentProductCategoriesRepository, currentProductsRepository } from '../../../repositories';
import { CreateProductController } from './CreateProductController';
import { CreateProductUseCases } from './CreateProductUseCases';

export function createProductFactory() {
  const useCases = new CreateProductUseCases(currentProductsRepository, currentProductCategoriesRepository);
  const controller = new CreateProductController(useCases);

  return { useCases, controller };
}
