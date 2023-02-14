import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../../entities/print-order/print/IPrint';
import { BadRequestError } from '../../../errors/BadRequestError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { ValidateService } from '../../../services/validate';

export class CreatePrintUseCases {

  constructor(
    private printsRepository: IPrintsRepository,
    private printOrdersRepository: IPrintOrdersRepository,
  ) { }

  async execute({ imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId }: PrintCreateRequest): Promise<IPrint> {
    if(ValidateService.someIsNullOrUndefined(imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId)) {
      throw new RequiredFieldsError('Nome da imagem', 'URL da imagem', 'Imagem', 'Borda', 'Cor/tipo', 'Preço/tamanho', 'Quantidade', 'Identificador do pedido');
    }

    if(isNaN(quantity)) {
      throw new NumberValidationError('Quantidade');
    }

    const printOrderExists = await this.printOrdersRepository.listById(printOrderId);
    if(!printOrderExists) {
      throw new PrintOrderNotFound();
    }

    const printExists = await this.printsRepository.listFirstByProperties({ imageUrl, key });
    if(printExists) {
      throw new BadRequestError('Esse pedido foto já está registrado.');
    }

    const print = await this.printsRepository.create({
      imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId,
    });

    return print;
  }

}
