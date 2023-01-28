import { IPrintPrice } from '../../../entities/print-price/IPrintPrice';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';

export class ListPrintPricesUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute(): Promise<IPrintPrice[]> {
    const printPrices = await this.printPricesRepository.listAll();

    return printPrices;
  }

}
