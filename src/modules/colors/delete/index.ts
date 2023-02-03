import { currentColorsRepository, currentPrintsRepository } from '../../../repositories';
import { DeleteColorController } from './DeleteColorController';
import { DeleteColorUseCases } from './DeleteColorUseCases';

export function deleteColorFactory() {
  const deleteColorUseCases = new DeleteColorUseCases(currentColorsRepository, currentPrintsRepository);
  const deleteColorController = new DeleteColorController(deleteColorUseCases);

  return { useCases: deleteColorUseCases, controller: deleteColorController };
}
