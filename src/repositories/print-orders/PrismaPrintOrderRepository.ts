import { prisma } from '../../database';
import { printOrderMapper } from '../../domain/PrintOrderMapper';
import { PrintOrderCreateRequest } from '../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder, PrintOrderStatus } from '../../entities/print-order/IPrintOrder';
import { PrintOrderFilter } from '../../shared/PrintOrderFilter';
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

  async listAll({ status, when }: PrintOrderFilter): Promise<IPrintOrder[]> {
    const printOrders = await prisma.printOrder.findMany({
      where: {
        status,
        createdAt: {
          gt: when,
        }
      },
      include,
    });

    return printOrders.map(printOrderMapper.toDomain);
  }

  async listById(id: string): Promise<IPrintOrder> {
    const printOrder = await prisma.printOrder.findFirst({
      where: { id },
      include,
    });

    if(!printOrder) {
      return null;
    }

    return printOrderMapper.toDomain(printOrder);
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

  async create({ number, totalPrintsExpected, userId }: PrintOrderCreateRequest): Promise<IPrintOrder> {
    const printOrder = await prisma.printOrder.create({
      data: {
        number,
        totalPrintsExpected,
        userId,
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
