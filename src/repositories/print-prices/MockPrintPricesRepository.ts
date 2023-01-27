import { IPrintPrice } from '../../entities/print-price/IPrintPrice';
import { IPrintPriceCreation } from '../../entities/print-price/IPrintPriceCreation';
import { IPrintPriceUpdating } from '../../entities/print-price/IPrintPriceUpdating';
import { uuidProvider } from '../../providers/UUID';
import { IPrintPricesRepository } from './IPrintPricesRepository';

export class MockPrintPricesRepository implements IPrintPricesRepository {

  private printPrices: IPrintPrice[] = [];

  async listAll(): Promise<IPrintPrice[]> {
    return [...this.printPrices];
  }

  async listByLength(length: string): Promise<IPrintPrice> {
    return this.printPrices.find(printPrice => printPrice.length === length);
  }

  async create({ length, price }: IPrintPriceCreation): Promise<IPrintPrice> {
    const id = uuidProvider.generateCUID();
    const printPrice: IPrintPrice = { id, length, price };

    this.printPrices.push(printPrice);

    return printPrice;
  }

  async updatePrice(id: string, { price }: IPrintPriceUpdating): Promise<IPrintPrice> {
    let printPriceUpdated;

    this.printPrices = this.printPrices.map(printPrice => {
      if(printPrice.id === id) {
        return printPriceUpdated = { ...printPrice, price };
      }

      return printPrice;
    });

    return printPriceUpdated;
  }

  async delete(id: string): Promise<void> {
    this.printPrices = this.printPrices.filter(printPrice => printPrice.id !== id);
  }

  cleanRepository(): void {
    this.printPrices = [];
  }

}
