import { IFailedImageUploaded } from '../../../entities/failed-image-uploaded/IFailedImageUploaded';
import { FailedImageUploadedNotFoundError } from '../../../errors/FailedImageUploadedNotFoundError';
import { NotFoundError } from '../../../errors/NotFoundError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';

export class ListFailedImageUploadedByKeyUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute(key: string): Promise<IFailedImageUploaded> {
    if(!key) {
      throw new FailedImageUploadedNotFoundError();
    }

    const failedImageUploaded = await this.failedImagesUploadedRepository.listByKey(key);
    if(!failedImageUploaded) {
      throw new NotFoundError('Imagem não encontrada');
    }

    return failedImageUploaded;
  }

}
