import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';

export class DeleteColorUseCases {

  constructor(
    private colorsRepository: IColorsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const colorExists = await this.colorsRepository.listById(id);
    if(!colorExists) {
      throw new ColorNotFoundError();
    }

    await this.colorsRepository.delete(id);
  }

}
