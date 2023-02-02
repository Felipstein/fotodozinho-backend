import { ColorCreateRequest } from '../../entities/colors/dtos/ColorCreateRequest';
import { IColor } from '../../entities/colors/IColor';

export interface IColorsRepository {

  listAll(): Promise<IColor[]>;

  listById(id: string): Promise<IColor>;

  listByColor(color: string): Promise<IColor>;

  create({ color }: ColorCreateRequest): Promise<IColor>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
