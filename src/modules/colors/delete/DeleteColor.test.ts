import { ListColorByIdUseCases } from './../listById/ListColorByIdUseCases';
import { CreateColorUseCases } from './../create/CreateColorUseCases';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { DeleteColorUseCases } from './DeleteColorUseCases';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';

describe('Delete Color', () => {

  const colorsRepository = new MockColorsRepository();
  const createColorUseCases = new CreateColorUseCases(colorsRepository);
  const deleteColorUseCases = new DeleteColorUseCases(colorsRepository);
  const listColorByIdUseCases = new ListColorByIdUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should delete color', async () => {
    const { id } = await createColorUseCases.execute({
      color: 'red',
    });

    await deleteColorUseCases.execute(id);

    expect(() => listColorByIdUseCases.execute(id)).rejects.toThrow(ColorNotFoundError);
  });

  it('should throw an error when delete color that does not exists', async () => {

    expect(() => deleteColorUseCases.execute('unknowid')).rejects.toThrow(ColorNotFoundError);
  });

});
