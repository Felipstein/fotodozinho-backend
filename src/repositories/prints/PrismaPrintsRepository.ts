import { prisma } from '../../database';
import { printMapper } from '../../domain/PrintMapper';
import { IPrint } from '../../entities/print-order/print/IPrint';
import { IPrintsRepository } from './IPrintsRepository';

const include = {
  color: true,
  printPrice: true,
};

export class PrismaPrintsRepository implements IPrintsRepository {

  async listByPrintOrderId(printOrderId: string): Promise<IPrint[]> {
    const prints = await prisma.print.findMany({
      where: { printOrderId },
      include,
    });

    return prints.map(printMapper.toDomain);
  }

  async deleteByPrintOrderId(printOrderId: string): Promise<void> {
    await prisma.print.deleteMany({ where: { printOrderId } });
  }

  cleanRepository(): void {}

}
