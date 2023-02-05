import { currentProductCategoriesRepository } from '../../../repositories';
import { ListProductCategoriesController } from './ListProductCategoriesController';
import { ListProductCategoriesUseCases } from './ListProductCategoriesUseCases';

export function listProductCategoriesFactory() {
  const useCases = new ListProductCategoriesUseCases(currentProductCategoriesRepository);
  const controller = new ListProductCategoriesController(useCases);

  return { useCases, controller };
}
