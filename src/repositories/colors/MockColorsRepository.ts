import { IColor } from '../../entities/colors/IColor';
import { IColorCreation } from '../../entities/colors/IColorCreation';
import { uuidProvider } from '../../providers/UUID';
import { IColorsRepository } from './IColorsRepository';

export class MockColorsRepository implements IColorsRepository {

  private colors: IColor[] = [];

  async listAll(): Promise<IColor[]> {
    return [...this.colors];
  }

  async listById(id: string): Promise<IColor> {
    return this.colors.find(color => color.id === id);
  }

  async create({ color }: IColorCreation): Promise<IColor> {
    const id = uuidProvider.generateCUID();
    const newColor = { id, color };

    this.colors.push(newColor);

    return newColor;
  }

  async delete(id: string): Promise<void> {
    this.colors = this.colors.filter(color => color.id !== id);
  }

  cleanRepository(): void {
    this.colors = [];
  }

}
