import { currentFailedImagesUploadedRepository } from '../../../repositories';
import { ListFailedImageUploadedByKeyController } from './ListFailedImageUploadedByKeyController';
import { ListFailedImageUploadedByKeyUseCases } from './ListFailedImageUploadedByKeyUseCases';

export function listFailedImageUploadedByKeyFactory() {
  const useCases = new ListFailedImageUploadedByKeyUseCases(currentFailedImagesUploadedRepository);
  const controller = new ListFailedImageUploadedByKeyController(useCases);

  return { useCases, controller };
}
