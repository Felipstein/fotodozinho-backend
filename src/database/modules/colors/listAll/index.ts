import { currentColorsRepository } from '../../../repositories';
import { ListColorsController } from './ListColorsController';
import { ListColorsUseCases } from './ListColorsUseCases';

export function listColorsFactory() {
  const listColorsUseCases = new ListColorsUseCases(currentColorsRepository);
  const listColorsControlller = new ListColorsController(listColorsUseCases);

  return { useCases: listColorsUseCases, controller: listColorsControlller };
}
