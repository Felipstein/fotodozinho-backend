import { currentColorsRepository } from '../../../repositories';
import { DeleteColorController } from './DeleteColorController';
import { DeleteColorUseCases } from './DeleteColorUseCases';

export function deleteColorFactory() {
  const deleteColorUseCases = new DeleteColorUseCases(currentColorsRepository);
  const deleteColorController = new DeleteColorController(deleteColorUseCases);

  return { useCases: deleteColorUseCases, controller: deleteColorController };
}
