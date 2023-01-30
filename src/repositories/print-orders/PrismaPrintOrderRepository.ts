import { prisma } from '../../database';
import { printCreationMapper } from '../../domain/PrintCreationMapper';
import { printMapper } from '../../domain/PrintMapper';
import { printOrderMapper } from '../../domain/PrintOrderMapper';
import { IPrintOrder, PrintOrderStatus } from '../../entities/print-order/IPrintOrder';
import { IPrintOrderCreation } from '../../entities/print-order/IPrintOrderCreation';
import { IPrintOrdersRepository } from './IPrintOrdersRepository';

const include = {
  Print: {
    include: {
      color: true,
      printPrice: true,
    },
  },
};

export class PrismaPrintOrderRepository implements IPrintOrdersRepository {

  async listAll(): Promise<IPrintOrder[]> {
    const printOrders = await prisma.printOrder.findMany({
      include,
    });

    return printOrders.map(printOrderMapper.toDomain);
  }

  async listByUserId(userId: string): Promise<IPrintOrder[]> {
    const printOrders = await prisma.printOrder.findMany({
      where: { userId },
      include,
    });

    return printOrders.map(printOrderMapper.toDomain);
  }

  async listByUserIdAndStatus(userId: string, status: PrintOrderStatus): Promise<IPrintOrder[]> {
    const printOrders = await prisma.printOrder.findMany({
      where: { userId, status },
      include,
    });

    return printOrders.map(printOrderMapper.toDomain);
  }

  async create({ prints, userId }: IPrintOrderCreation): Promise<IPrintOrder> {
    const printOrder = await prisma.printOrder.create({
      data: {
        userId,
        Print: {
          create: prints.map(printCreationMapper.toPersistence),
        },
      },
      include,
    });

    return printOrderMapper.toDomain(printOrder);
  }

  async updateStatus(id: string, newStatus: PrintOrderStatus): Promise<IPrintOrder> {
    const printOrder = await prisma.printOrder.update({
      where: { id },
      data: { status: newStatus },
      include,
    });

    return printOrderMapper.toDomain(printOrder);
  }

  async delete(id: string): Promise<void> {
    await prisma.printOrder.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.printOrder.deleteMany({
      where: { userId },
    });
  }

  cleanRepository(): void {}

}
