import { prisma } from '../../database';
import { ISupportRequest } from '../../entities/support-request/ISupportRequest';
import { SupportRequestCreateRequest } from '../../entities/support-request/dtos/SupportRequestCreateRequest';
import { ISupportRequestsRepository } from './ISupportRequestsRepository';

export class PrismaSupportRequestRepository implements ISupportRequestsRepository {

  listAll(): Promise<ISupportRequest[]> {
    return prisma.supportRequest.findMany();
  }

  create({ email }: SupportRequestCreateRequest): Promise<ISupportRequest> {
    return prisma.supportRequest.create({
      data: { email },
    });
  }

  updateResolved(id: string, resolved: boolean): Promise<ISupportRequest> {
    return prisma.supportRequest.update({
      where: { id },
      data: { resolved },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.supportRequest.delete({
      where: { id },
    });
  }

}
