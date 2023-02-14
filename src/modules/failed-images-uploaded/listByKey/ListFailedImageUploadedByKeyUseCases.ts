import { IFailedImageUploaded } from '../../../entities/failed-image-uploaded/IFailedImageUploaded';
import { NotFoundError } from '../../../errors/NotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';

export class ListFailedImageUploadedByKeyUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute(key: string): Promise<IFailedImageUploaded> {
    if(!key) {
      throw new RequiredFieldsError('Nome da imagem');
    }

    const failedImageUploaded = await this.failedImagesUploadedRepository.listByKey(key);
    if(!failedImageUploaded) {
      throw new NotFoundError('Imagem não encontrada');
    }

    return failedImageUploaded;
  }

}
