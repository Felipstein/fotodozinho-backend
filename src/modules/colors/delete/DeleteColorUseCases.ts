import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { ConflictRequestError } from '../../../errors/ConflictRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';

export class DeleteColorUseCases {

  constructor(
    private colorsRepository: IColorsRepository,
    private printsRepository: IPrintsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const color = await this.colorsRepository.listById(id);
    if(!color) {
      throw new ColorNotFoundError();
    }

    const prints = await this.printsRepository.listManyByProperties({ colorId: color.id });
    if(prints.length > 0) {
      throw new ConflictRequestError('Não é possível deletar esse tipo de cor. Existe uma ou mais fotos para serem impressas que a utilizam.');
    }

    await this.colorsRepository.delete(id);
  }

}
