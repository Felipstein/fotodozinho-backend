import { currentFailedImagesUploadedRepository } from '../../../repositories';
import { DeleteFailedImagesUploadedController } from './DeleteFailedImagesUploadedController';
import { DeleteFailedImagesUploadedUseCases } from './DeleteFailedImagesUploadedUseCases';

export function deleteFailedImagesUploadedFactory() {
  const useCases = new DeleteFailedImagesUploadedUseCases(currentFailedImagesUploadedRepository);
  const controller = new DeleteFailedImagesUploadedController(useCases);

  return { useCases, controller };
}
