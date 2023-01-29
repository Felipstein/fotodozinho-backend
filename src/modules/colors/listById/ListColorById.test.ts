import { CreateColorUseCases } from '../create/CreateColorUseCases';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { ListColorByIdUseCases } from './ListColorByIdUseCases';
import { NotFoundError } from '../../../errors/NotFoundError';

describe('List Color by Id', () => {

  const colorsRepository = new MockColorsRepository();
  const createColorUseCases = new CreateColorUseCases(colorsRepository);
  const listColorByIdUseCases = new ListColorByIdUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should list exaclty color created', async () => {
    const colorCreated = await createColorUseCases.execute({ color: 'red' });

    const colorListed = await listColorByIdUseCases.execute(colorCreated.id);

    expect(colorListed).toEqual(colorCreated);
  });

  it('should throw an error when list color that does not exists', async () => {

    expect(() => listColorByIdUseCases.execute('unknowid')).rejects.toThrow(NotFoundError);
  });

});
