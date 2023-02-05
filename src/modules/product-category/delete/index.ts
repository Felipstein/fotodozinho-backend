import { currentProductCategoriesRepository } from '../../../repositories';
import { DeleteProductCategoryController } from './DeleteProductCategoryController';
import { DeleteProductCategoryUseCases } from './DeleteProductCategoryUseCases';

export function deleteProductCategoryFactory() {
  const useCases = new DeleteProductCategoryUseCases(currentProductCategoriesRepository);
  const controller = new DeleteProductCategoryController(useCases);

  return { useCases, controller };
}
