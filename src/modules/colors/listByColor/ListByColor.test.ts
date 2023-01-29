import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { CreateColorUseCases } from '../create/CreateColorUseCases';
import { ListByColorUseCases } from './ListByColorUseCases';

describe('List by Color', () => {

  const colorsRepository = new MockColorsRepository();
  const createColorUseCases = new CreateColorUseCases(colorsRepository);
  const listByColorUseCases = new ListByColorUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should list exaclty color created', async () => {
    const colorCreated = await createColorUseCases.execute({
      color: 'red',
    });

    const colorListed = await listByColorUseCases.execute(colorCreated.color);

    expect(colorListed).toEqual(colorCreated);
  });

});
