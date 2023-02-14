import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../../entities/print-order/print/IPrint';
import { BadRequestError } from '../../../errors/BadRequestError';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { PrintOrderNotFound } from '../../../errors/PrintOrderNotFoundError';
import { PrintPriceNotFound } from '../../../errors/PrintPriceNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { EnvProvider } from '../../../services/env-provider';
import { ImageStoragedService } from '../../../services/image-storaged-type';
import { ParseBoolean } from '../../../services/parse-boolean';
import { ValidateService } from '../../../services/validate';

export class CreatePrintUseCases {

  constructor(
    private printsRepository: IPrintsRepository,
    private printOrdersRepository: IPrintOrdersRepository,
    private colorsRepository: IColorsRepository,
    private printPricesRepository: IPrintPricesRepository,
  ) { }

  async execute({ imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId }: Omit<PrintCreateRequest, 'imageStoragedType'>): Promise<IPrint> {
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

    const colorExists = await this.colorsRepository.listById(colorId);
    if(!colorExists) {
      throw new ColorNotFoundError();
    }

    const printPriceExists = await this.printPricesRepository.listById(printPriceId);
    if(!printPriceExists) {
      throw new PrintPriceNotFound();
    }

    const printExists = await this.printsRepository.listFirstByProperties({ imageUrl, key });
    if(printExists) {
      throw new BadRequestError('Esse pedido foto já está registrado.');
    }

    const imageStoragedType = ImageStoragedService.convertStorageTypeFormat(EnvProvider.storageType);

    const print = await this.printsRepository.create({
      imageName, imageUrl, key, imageStoragedType, border: ParseBoolean.parse(border), colorId, printPriceId, quantity, printOrderId,
    });

    return print;
  }

}
