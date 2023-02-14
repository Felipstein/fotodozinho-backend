import { prisma } from '../../database';
import { IFailedImageUploaded } from '../../entities/failed-image-uploaded/IFailedImageUploaded';
import { FailedImageUploadedCreateRequest } from '../../entities/failed-image-uploaded/dtos/FailedImageUploadedCreateRequest';
import { ImageStoragedService } from '../../services/image-storaged-type';
import { IFailedImageUploadedRepository } from './IFailedImagesUploadedRepository';

export class PrismaFailedImagesUploadedRepository implements IFailedImageUploadedRepository {

  async listAll(): Promise<IFailedImageUploaded[]> {
    const failedImagesUploaded = await prisma.failedImageUploaded.findMany();

    return failedImagesUploaded.map(({ id, key, storagedType }) =>
      ({ id, key, storagedType: ImageStoragedService.convertStorageTypeFormat(storagedType) })
    );
  }

  async listByKey(key: string): Promise<IFailedImageUploaded> {
    const failedImageUploaded = await prisma.failedImageUploaded.findFirst({ where: { key } });

    if(!failedImageUploaded) {
      return null;
    }

    return { id: failedImageUploaded.id, key, storagedType: ImageStoragedService.convertStorageTypeFormat(failedImageUploaded.storagedType) };
  }

  async create({ key, storagedType }: FailedImageUploadedCreateRequest): Promise<IFailedImageUploaded> {
    const storagedTypeConverted = ImageStoragedService.convertStorageTypePrismaFormat(storagedType);

    const failedImageUploaded = await prisma.failedImageUploaded.create({ data: { key, storagedType: storagedTypeConverted } });

    return { id: failedImageUploaded.id, key, storagedType };
  }

  async deleteByKey(key: string): Promise<void> {
    await prisma.failedImageUploaded.delete({ where: { key } });
  }

  async deleteAll(): Promise<void> {
    await prisma.failedImageUploaded.deleteMany();
  }

}
