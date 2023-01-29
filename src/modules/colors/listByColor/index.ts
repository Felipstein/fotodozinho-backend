import { currentColorsRepository } from '../../../repositories';
import { ListByColorController } from './ListByColorController';
import { ListByColorUseCases } from './ListByColorUseCases';

export function listByColorFactory() {
  const listByColorUseCases = new ListByColorUseCases(currentColorsRepository);
  const listByColorController = new ListByColorController(listByColorUseCases);

  return { useCases: listByColorUseCases, controller: listByColorController };
}
