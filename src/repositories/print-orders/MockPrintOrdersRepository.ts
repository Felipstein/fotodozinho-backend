import { IPrintOrder, PrintOrderStatus } from '../../entities/print-order/IPrintOrder';
import { IPrintOrderCreation } from '../../entities/print-order/IPrintOrderCreation';
import { IPrint } from '../../entities/print-order/print/IPrint';
import { uuidProvider } from '../../providers/UUID';
import { IPrintOrdersRepository } from './IPrintOrdersRepository';

export class MockPrintOrdersRepository implements IPrintOrdersRepository {

  private printOrders: IPrintOrder[] = [];

  async listAll(): Promise<IPrintOrder[]> {
    return [...this.printOrders];
  }

  async listByUserId(userId: string): Promise<IPrintOrder[]> {
    return this.printOrders.filter(printOrder => printOrder.userId === userId);
  }

  async listByUserIdAndStatus(userId: string, status: PrintOrderStatus): Promise<IPrintOrder[]> {
    return this.printOrders.filter(printOrder => printOrder.userId === userId && printOrder.status === status);
  }

  async create({ prints, userId }: IPrintOrderCreation): Promise<IPrintOrder> {
    const id = uuidProvider.generateCUID();
    const date = new Date();

    const printsMapped = prints.map(print => ({
      ...print,
      id: uuidProvider.generateCUID(),
    } as IPrint));

    const printOrder: IPrintOrder = {
      id, prints: printsMapped, userId, status: 'WAITING', createdAt: date
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
