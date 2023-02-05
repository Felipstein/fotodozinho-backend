import { currentProductCategoriesRepository } from '../../../repositories';
import { CreateProductCategoryController } from './CreateProductCategoryController';
import { CreateProductCategoryUseCases } from './CreateProductCategoryUseCases';

export function createProductCategoryFactory() {
  const createProductCategoryUseCases = new CreateProductCategoryUseCases(currentProductCategoriesRepository);
  const createProductCategoryController = new CreateProductCategoryController(createProductCategoryUseCases);

  return { useCases: createProductCategoryUseCases, controller: createProductCategoryController };
}
