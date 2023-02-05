import { currentProductCategoriesRepository } from '../../../repositories';
import { ListProductCategoryByIdController } from './ListProductCategoryByIdController';
import { ListProductCategoryByIdUseCases } from './ListProductCategoryByIdUseCases';

export function listProductCategoryByIdFactory() {
  const useCases = new ListProductCategoryByIdUseCases(currentProductCategoriesRepository);
  const controller = new ListProductCategoryByIdController(useCases);

  return { useCases, controller };
}
