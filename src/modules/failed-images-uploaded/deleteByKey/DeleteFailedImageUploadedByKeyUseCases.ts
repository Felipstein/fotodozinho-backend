import { ConflictRequestError } from '../../../errors/ConflictRequestError';
import { FailedImageUploadedNotFoundError } from '../../../errors/FailedImageUploadedNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';
import { ImageDeleteService } from '../../../services/image-delete';

export class DeleteFailedImageUploadedByKeyUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute(key: string): Promise<void> {
    if(!key) {
      throw new RequiredFieldsError('Nome da imagem');
    }

    const failedImageUploadedExists = await this.failedImagesUploadedRepository.listByKey(key);
    if(!failedImageUploadedExists) {
      throw new FailedImageUploadedNotFoundError();
    }

    try {
      await ImageDeleteService.deleteImage(key, failedImageUploadedExists.storagedType);

      await this.failedImagesUploadedRepository.deleteByKey(key);
    } catch (err: any) {
      throw new ConflictRequestError('Ainda não foi possível deletar a imagem');
    }

  }

}
