import { IPrintPriceUpdating } from './../entities/print-price/IPrintPriceUpdating';
import { IPrintPriceCreation } from './../entities/print-price/IPrintPriceCreation';
import { IPrintPrice } from '../entities/print-price/IPrintPrice';

export interface IPrintPricesRepository {

  listAll(): Promise<IPrintPrice[]>;

  create({ length, price }: IPrintPriceCreation): Promise<IPrintPrice>;

  updatePrice(id: string, { price }: IPrintPriceUpdating): Promise<IPrintPrice>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
