import { CreateColorDTO } from './CreateColorDTO';
import { IColor } from '../../../entities/colors/IColor';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { BadRequestError } from '../../../errors/BadRequestError';

export class CreateColorUseCases {

  constructor(
    private colorsRepository: IColorsRepository,
  ) { }

  async execute({ color }: CreateColorDTO): Promise<IColor> {
    if(!color) {
      throw new RequiredFieldsError('Cor/descrição');
    }

    const colorExists = await this.colorsRepository.listByColor(color);
    if(colorExists) {
      throw new BadRequestError('Essa cor/descrição já existe');
    }

    const colorCreated = await this.colorsRepository.create({ color });

    return colorCreated;
  }

}
