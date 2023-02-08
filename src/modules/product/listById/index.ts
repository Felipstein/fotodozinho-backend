import { currentProductsRepository } from '../../../repositories';
import { ListProductByIdController } from './ListProductByIdController';
import { ListProductByIdUseCases } from './ListProductByIdUseCases';

export function listProductByIdFactory() {
  const useCases = new ListProductByIdUseCases(currentProductsRepository);
  const controller = new ListProductByIdController(useCases);

  return { useCases, controller };
}
