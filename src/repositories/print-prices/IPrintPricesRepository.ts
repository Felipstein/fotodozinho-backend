import { IPrintPriceCreation } from '../../entities/print-price/IPrintPriceCreation';
import { IPrintPrice } from '../../entities/print-price/IPrintPrice';

export interface IPrintPricesRepository {

  listAll(): Promise<IPrintPrice[]>;

  listById(id: string): Promise<IPrintPrice>;

  listByLength(length: string): Promise<IPrintPrice>;

  create({ length, price }: IPrintPriceCreation): Promise<IPrintPrice>;

  updatePrice(id: string, newPrice: number): Promise<IPrintPrice>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
