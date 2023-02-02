import { prisma } from '../../database';
import { ColorCreateRequest } from '../../entities/colors/dtos/ColorCreateRequest';
import { IColor } from '../../entities/colors/IColor';
import { IColorsRepository } from './IColorsRepository';

export class PrismaColorsRepository implements IColorsRepository {

  listAll(): Promise<IColor[]> {
    return prisma.color.findMany();
  }

  listById(id: string): Promise<IColor> {
    return prisma.color.findFirst({ where: { id } });
  }

  listByColor(color: string): Promise<IColor> {
    return prisma.color.findFirst({ where: { color } });
  }

  create({ color }: ColorCreateRequest): Promise<IColor> {
    return prisma.color.create({
      data: { color },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.color.delete({ where: { id } });
  }

  cleanRepository(): void {}

}
