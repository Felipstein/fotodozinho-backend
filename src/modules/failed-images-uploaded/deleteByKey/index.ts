import { currentFailedImagesUploadedRepository } from '../../../repositories';
import { DeleteFailedImageUploadedByKeyController } from './DeleteFailedImageUploadedByKeyController';
import { DeleteFailedImageUploadedByKeyUseCases } from './DeleteFailedImageUploadedByKeyUseCases';

export function deleteFailedImageUploadedByKeyFactory() {
  const useCases = new DeleteFailedImageUploadedByKeyUseCases(currentFailedImagesUploadedRepository);
  const controller = new DeleteFailedImageUploadedByKeyController(useCases);

  return { useCases, controller };
}
