import { currentFailedImagesUploadedRepository } from '../../../repositories';
import { CreateFailedImageUploadedController } from './CreateFailedImageUploadedController';
import { CreateFailedImageUploadedUseCases } from './CreateFailedImageUploadedUseCases';

export function createFailedImageUploadedFactory() {
  const useCases = new CreateFailedImageUploadedUseCases(currentFailedImagesUploadedRepository);
  const controller = new CreateFailedImageUploadedController(useCases);

  return { useCases, controller };
}
