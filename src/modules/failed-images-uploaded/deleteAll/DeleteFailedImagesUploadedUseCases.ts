import { BadRequestError } from '../../../errors/BadRequestError';
import { ConflictRequestError } from '../../../errors/ConflictRequestError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';
import { ImageDeleteService } from '../../../services/image-delete';

export class DeleteFailedImagesUploadedUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute(): Promise<void> {

    const failedImagesUploaded = await this.failedImagesUploadedRepository.listAll();
    if(failedImagesUploaded.length === 0) {
      throw new BadRequestError('Nenhuma imagem foi deletada');
    }

    try {
      failedImagesUploaded.forEach(failedImageUploaded => {
        ImageDeleteService.deleteImage(failedImageUploaded.key, failedImageUploaded.storagedType);
      });

      await this.failedImagesUploadedRepository.deleteAll();
    } catch (err: any) {
      throw new ConflictRequestError('Ainda não conseguimos deletar algumas imagens');
    }
  }

}
