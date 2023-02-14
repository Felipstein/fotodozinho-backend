import { PrintOrderCreateRequest } from '../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder, PrintOrderStatus } from '../../entities/print-order/IPrintOrder';
import { uuidProvider } from '../../providers/UUID';
import { IPrintOrdersRepository } from './IPrintOrdersRepository';

export class MockPrintOrdersRepository implements IPrintOrdersRepository {

  private printOrders: IPrintOrder[] = [];

  async listAll(): Promise<IPrintOrder[]> {
    return [...this.printOrders];
  }

  async listById(id: string): Promise<IPrintOrder> {
    return this.printOrders.find(printOrder => printOrder.id === id);
  }

  async listByUserId(userId: string): Promise<IPrintOrder[]> {
    return this.printOrders.filter(printOrder => printOrder.userId === userId);
  }

  async listByUserIdAndStatus(userId: string, status: PrintOrderStatus): Promise<IPrintOrder[]> {
    return this.printOrders.filter(printOrder => printOrder.userId === userId && printOrder.status === status);
  }

  async create({ number, userId }: PrintOrderCreateRequest): Promise<IPrintOrder> {
    const id = uuidProvider.generateCUID();
    const date = new Date();

    const printOrder: IPrintOrder = {
      id, number, prints: [], userId, status: 'WAITING', createdAt: date
    };

    this.printOrders.push(printOrder);

    return printOrder;
  }

  async updateStatus(id: string, newStatus: PrintOrderStatus): Promise<IPrintOrder> {
    let printOrderUpdated: IPrintOrder;

    this.printOrders = this.printOrders.map(printOrder => {
      if(printOrder.id === id) {
        return printOrderUpdated = { ...printOrder, status: newStatus };
      }

      return printOrder;
    });

    return printOrderUpdated;
  }

  async delete(id: string): Promise<void> {
    this.printOrders = this.printOrders.filter(printOrder => printOrder.id !== id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.printOrders = this.printOrders.filter(printOrder => printOrder.userId !== userId);
  }

  cleanRepository(): void {
    this.printOrders = [];
  }

}
