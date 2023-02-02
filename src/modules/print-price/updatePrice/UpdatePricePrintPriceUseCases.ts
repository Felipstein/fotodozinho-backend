import { PrintPriceUpdateRequest } from '../../../entities/print-price/dtos/PrintPriceUpdateRequest';
import { IPrintPrice } from '../../../entities/print-price/IPrintPrice';
import { FieldsMustBeNumericError } from '../../../errors/FieldsMustBeNumericError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';

export class UpdatePricePrintPriceUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute(id: string, { price }: PrintPriceUpdateRequest): Promise<IPrintPrice> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!price) {
      throw new RequiredFieldsError('Preço');
    }

    if(isNaN(price)) {
      throw new FieldsMustBeNumericError('Preço');
    }

    const printPriceExists = await this.printPricesRepository.listById(id);
    if(!printPriceExists) {
      throw new PrintPriceNotFound();
    }

    const printPrice = await this.printPricesRepository.updatePrice(id, price);

    return printPrice;
  }

}
