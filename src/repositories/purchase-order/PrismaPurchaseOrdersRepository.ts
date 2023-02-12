import { prisma } from '../../database';
import { purchaseOrderMapper } from '../../domain/PurchaseOrderMapper';
import { purchaseOrderProductCreationMapper } from '../../domain/PurchaseOrderProductCreationMapper';
import { IPurchaseOrder } from '../../entities/purchase-order/IPurchaseOrder';
import { PurchaseOrderCreateRequest } from '../../entities/purchase-order/dtos/PurchaseOrderCreateRequest';
import { PurchaseOrderUpdateRequest } from '../../entities/purchase-order/dtos/PurchaseOrderUpdateRequest';
import { IPurchaseOrdersRepository } from './IPurchaseOrdersRepository';

const include = {
  paymentMethod: true,
  PurchaseOrderProduct: {
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  },
};

export class PrismaPurchaseOrdersRepository implements IPurchaseOrdersRepository {

  async listAll(): Promise<IPurchaseOrder[]> {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      include,
    });

    return purchaseOrders.map(purchaseOrderMapper.toDomain);
  }

  async listByUserId(userId: string): Promise<IPurchaseOrder[]> {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      where: { userId },
      include,
    });

    return purchaseOrders.map(purchaseOrderMapper.toDomain);
  }

  async listById(id: string): Promise<IPurchaseOrder> {
    const purchaseOrder = await prisma.purchaseOrder.findFirst({
      where: { id },
      include,
    });

    if(!purchaseOrder) {
      return null;
    }

    return purchaseOrderMapper.toDomain(purchaseOrder);
  }

  async create({ number, paymentMethodId, products, userId }: PurchaseOrderCreateRequest): Promise<IPurchaseOrder> {
    const purchaseOrder = await prisma.purchaseOrder.create({
      data: {
        number,
        paymentMethodId,
        PurchaseOrderProduct: {
          create: products.map(purchaseOrderProductCreationMapper.toPersistence),
        },
        freight: 5,
        discount: 0,
        userId,
      },
      include,
    });

    return purchaseOrderMapper.toDomain(purchaseOrder);
  }

  async update(id: string, { status, paymentMethodId, freight, discount }: PurchaseOrderUpdateRequest): Promise<IPurchaseOrder> {
    const purchaseOrder = await prisma.purchaseOrder.update({
      where: { id },
      data: {
        status, paymentMethodId, freight, discount,
      },
      include,
    });

    return purchaseOrderMapper.toDomain(purchaseOrder);
  }

  async delete(id: string): Promise<void> {
    await prisma.purchaseOrder.delete({ where: { id } });
  }

}
