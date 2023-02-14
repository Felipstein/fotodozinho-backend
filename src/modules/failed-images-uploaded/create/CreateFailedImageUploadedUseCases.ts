import { IFailedImageUploaded } from '../../../entities/failed-image-uploaded/IFailedImageUploaded';
import { FailedImageUploadedCreateRequest } from '../../../entities/failed-image-uploaded/dtos/FailedImageUploadedCreateRequest';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';
import { ImageStoragedService } from '../../../services/image-storaged-type';

export class CreateFailedImageUploadedUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute({ key, storagedType }: FailedImageUploadedCreateRequest): Promise<IFailedImageUploaded> {
    if(!key) {
      throw new RequiredFieldsError('Nome da imagem');
    }

    if(!ImageStoragedService.isCorrectStorageTypeFormat(storagedType)) {
      throw new BadRequestError('O campo "tipo de armazenamento" só aceita valores como "s3" ou "local"');
    }

    const failedImageUploadedExists = await this.failedImagesUploadedRepository.listByKey(key);
    if(failedImageUploadedExists) {
      throw new BadRequestError('Essa imagem já foi registrada');
    }

    const failedImageUploaded = await this.failedImagesUploadedRepository.create({ key, storagedType });

    return failedImageUploaded;
  }

}
