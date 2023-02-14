import { currentFailedImagesUploadedRepository } from '../../../repositories';
import { ListFailedImagesUploadedController } from './ListFailedImagesUploadedController';
import { ListFailedImagesUploadedUseCases } from './ListFailedImagesUploadedUseCases';

export function listFailedImagesUploadedFactory() {
  const useCases = new ListFailedImagesUploadedUseCases(currentFailedImagesUploadedRepository);
  const controller = new ListFailedImagesUploadedController(useCases);

  return { useCases, controller };
}
