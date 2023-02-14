import { PrintPriceCreateRequest } from '../../../entities/print-price/dtos/PrintPriceCreateRequest';
import { IPrintPrice } from '../../../entities/print-price/IPrintPrice';
import { BadRequestError } from '../../../errors/BadRequestError';
import { FieldsMustBeNumericError } from '../../../errors/FieldsMustBeNumericError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { ValidateService } from '../../../services/validate';

export class CreatePrintPriceUseCases {

  constructor(
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute({ length, price }: PrintPriceCreateRequest): Promise<IPrintPrice> {

    if(ValidateService.someIsNullOrUndefined(length, price)) {
      throw new RequiredFieldsError('Tamanho/tipo', 'Preço');
    }

    if(isNaN(price)) {
      throw new FieldsMustBeNumericError('Preço');
    }

    const lengthExists = await this.printPricesRepository.listByLength(length);
    if(lengthExists) {
      throw new BadRequestError('Já existe esse tamanho/tipo cadastrado');
    }

    const printPrice = await this.printPricesRepository.create({ length, price });

    return printPrice;
  }

}
