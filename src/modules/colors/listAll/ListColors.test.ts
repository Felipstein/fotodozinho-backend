import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { ListColorsUseCases } from './ListColorsUseCases';

describe('List Colors', () => {

  const colorsRepository = new MockColorsRepository();
  const listColorsUseCases = new ListColorsUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should list two colors', async () => {
    await colorsRepository.create({
      color: 'red',
    });

    await colorsRepository.create({
      color: 'blue',
    });

    const colorsListed = await listColorsUseCases.execute();

    expect(colorsListed).toHaveLength(2);
  });

  it('should list two exaclty colors', async () => {
    const { id: redId } = await colorsRepository.create({
      color: 'red',
    });

    const { id: blueId } = await colorsRepository.create({
      color: 'blue',
    });

    const colorsListed = await listColorsUseCases.execute();

    expect(colorsListed).toContainEqual({ id: redId, color: 'red' });
    expect(colorsListed).toContainEqual({ id: blueId, color: 'blue' });
  });

});
