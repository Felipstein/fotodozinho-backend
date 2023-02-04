import { prisma } from '../../database';
import { IPaymentMethod } from '../../entities/payment-method/IPaymentMethod';
import { PaymentMethodCreateRequest } from '../../entities/payment-method/dtos/PaymentMethodCreateRequest';
import { IPaymentMethodsRepository } from './IPaymentMethodsRepository';

export class PrismaPaymentMethodsRepository implements IPaymentMethodsRepository {

  listAll(): Promise<IPaymentMethod[]> {
    return prisma.paymentMethod.findMany();
  }

  listById(id: string): Promise<IPaymentMethod> {
    return prisma.paymentMethod.findFirst({ where: { id } });
  }

  create({ name }: PaymentMethodCreateRequest): Promise<IPaymentMethod> {
    return prisma.paymentMethod.create({
      data: { name },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.paymentMethod.delete({
      where: { id },
    });
  }

  cleanRepository(): void {}

}
