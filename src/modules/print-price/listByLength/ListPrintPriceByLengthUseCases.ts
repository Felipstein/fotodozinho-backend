import { IPrintPrice } from '../../../entities/print-price/IPrintPrice';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';

export class ListPrintPriceByLengthUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute(length: string): Promise<IPrintPrice> {
    if(!length) {
      throw new RequiredFieldsError('Tamanho/tipo');
    }

    const printPrice = await this.printPricesRepository.listByLength(length);
    if(!printPrice) {
      throw new PrintPriceNotFound();
    }

    return printPrice;
  }

}
