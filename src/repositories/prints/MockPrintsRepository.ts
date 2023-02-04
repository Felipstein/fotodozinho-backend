/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPrint } from '../../entities/print-order/print/IPrint';
import { IPrintsRepository } from './IPrintsRepository';

export class MockPrintsRepository implements IPrintsRepository {

  private prints: IPrint[] = [];

  async listPrintByImageUrl(imageUrl: string): Promise<IPrint> {
    return this.prints.find(print => print.imageUrl === imageUrl);
  }

  async listPrintByKey(key: string): Promise<IPrint> {
    return this.prints.find(print => print.key === key);
  }

  async listByPrintOrderId(printOrderId: string): Promise<IPrint[]> {
    return this.prints.filter(print => print.printOrderId === printOrderId);
  }

  async listByColorId(colorId: string): Promise<IPrint[]> {
    return [];
  }

  async listByPrintPriceId(printPriceId: string): Promise<IPrint[]> {
    return [];
  }

  async deleteByPrintOrderId(printOrderId: string): Promise<void> {
    this.prints = this.prints.filter(print => print.printOrderId !== printOrderId);
  }

  cleanRepository(): void {
    this.prints = [];
  }

}
