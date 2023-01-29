import { IColor } from '../../entities/colors/IColor';
import { IColorCreation } from '../../entities/colors/IColorCreation';

export interface IColorsRepository {

  listAll(): Promise<IColor[]>;

  listById(id: string): Promise<IColor>;

  create({ color }: IColorCreation): Promise<IColor>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
