import { IColor } from '../../../entities/colors/IColor';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';

export class ListColorsUseCases {

  constructor(
    private colorsRepository: IColorsRepository,
  ) { }

  async execute(): Promise<IColor[]> {
    const colors = await this.colorsRepository.listAll();

    return colors;
  }

}
