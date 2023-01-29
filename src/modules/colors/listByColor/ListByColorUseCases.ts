import { IColor } from '../../../entities/colors/IColor';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';

export class ListByColorUseCases {

  constructor(
    private colorsRepository: IColorsRepository,
  ) { }

  async execute(color: string): Promise<IColor> {
    if(!color) {
      throw new RequiredFieldsError('Cor/descrição');
    }

    const colorObj = this.colorsRepository.listByColor(color);
    if(!colorObj) {
      throw new ColorNotFoundError();
    }

    return colorObj;
  }

}
