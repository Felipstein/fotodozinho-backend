import { FailedImageUploadedNotFoundError } from '../../../errors/FailedImageUploadedNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';

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

    await this.failedImagesUploadedRepository.deleteByKey(key);
  }

}
