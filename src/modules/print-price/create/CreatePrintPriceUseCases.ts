import { IPrintPrice } from '../../../entities/print-price/IPrintPrice';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { CreatePrintPriceDTO } from './CreatePrintPriceDTO';

export class CreatePrintPriceUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute({ length, price }: CreatePrintPriceDTO): Promise<IPrintPrice> {
    if(someIsNullOrUndefined(length, price)) {
      throw new RequiredFieldsError();
    }

    const lengthExists = await this.printPricesRepository.listByLength(length);
    if(lengthExists) {
      throw new BadRequestError('Já existe esse tamanho/tipo cadastrado');
    }

    const printPrice = await this.printPricesRepository.create({ length, price });

    return printPrice;
  }

}
