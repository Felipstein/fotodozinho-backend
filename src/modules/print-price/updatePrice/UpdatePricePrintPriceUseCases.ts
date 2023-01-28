import { IPrintPrice } from '../../../entities/print-price/IPrintPrice';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { UpdatePricePrintPriceDTO } from './UpdatePricePrintPriceDTO';

export class UpdatePricePrintPriceUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute(id: string, { price }: UpdatePricePrintPriceDTO): Promise<IPrintPrice> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!price) {
      throw new RequiredFieldsError('Preço');
    }

    const printPriceExists = await this.printPricesRepository.listById(id);
    if(!printPriceExists) {
      throw new PrintPriceNotFound();
    }

    const printPrice = await this.printPricesRepository.updatePrice(id, { price });

    return printPrice;
  }

}
