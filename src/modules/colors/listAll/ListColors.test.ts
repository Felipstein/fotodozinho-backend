import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { CreateColorUseCases } from '../create/CreateColorUseCases';
import { ListColorsUseCases } from './ListColorsUseCases';

describe('List Colors', () => {

  const colorsRepository = new MockColorsRepository();
  const createColorUseCases = new CreateColorUseCases(colorsRepository);
  const listColorsUseCases = new ListColorsUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should list two colors', async () => {
    await createColorUseCases.execute({
      color: 'red',
    });

    await createColorUseCases.execute({
      color: 'blue',
    });

    const colorsListed = await listColorsUseCases.execute();

    expect(colorsListed).toHaveLength(2);
  });

  it('should list two exaclty colors', async () => {
    const { id: redId } = await createColorUseCases.execute({
      color: 'red',
    });

    const { id: blueId } = await createColorUseCases.execute({
      color: 'blue',
    });

    const colorsListed = await listColorsUseCases.execute();

    expect(colorsListed).toContainEqual({ id: redId, color: 'red' });
    expect(colorsListed).toContainEqual({ id: blueId, color: 'blue' });
  });

});
