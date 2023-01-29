import { IColor } from '../../../entities/colors/IColor';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';

export class ListColorByIdUseCases {

  constructor(
    private colorsRepository: IColorsRepository,
  ) { }

  async execute(id: string): Promise<IColor> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const color = await this.colorsRepository.listById(id);
    if(!color) {
      throw new ColorNotFoundError();
    }

    return color;
  }

}
