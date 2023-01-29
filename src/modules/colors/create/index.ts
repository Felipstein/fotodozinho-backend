import { currentColorsRepository } from '../../../repositories';
import { CreateColorController } from './CreateColorController';
import { CreateColorUseCases } from './CreateColorUseCases';

export function createColorFactory() {
  const createColorUseCases = new CreateColorUseCases(currentColorsRepository);
  const createColorController = new CreateColorController(createColorUseCases);

  return { useCases: createColorUseCases, controller: createColorController };
}
