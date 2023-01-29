import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { DeleteColorUseCases } from './DeleteColorUseCases';
import { ColorNotFoundError } from '../../../errors/ColorNotFoundError';

describe('Delete Color', () => {

  const colorsRepository = new MockColorsRepository();
  const deleteColorUseCases = new DeleteColorUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should delete color', async () => {
    const { id } = await colorsRepository.create({
      color: 'red',
    });

    await deleteColorUseCases.execute(id);

    const result = await colorsRepository.listById(id);

    expect(result).toBeFalsy();
  });

  it('should throw an error when delete color that does not exists', async () => {

    expect(() => deleteColorUseCases.execute('unknowid')).rejects.toThrow(ColorNotFoundError);
  });

});
