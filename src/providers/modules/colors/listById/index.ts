import { ListColorByIdController } from './ListColorByIdController';
import { currentColorsRepository } from '../../../repositories';
import { ListColorByIdUseCases } from './ListColorByIdUseCases';

export function listColorByIdFactory() {
  const listColorByIdUseCases = new ListColorByIdUseCases(currentColorsRepository);
  const listColorByIdController = new ListColorByIdController(listColorByIdUseCases);

  return { useCases: listColorByIdUseCases, controller: listColorByIdController };
}
