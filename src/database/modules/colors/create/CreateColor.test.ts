import { IColorCreation } from './../../../entities/colors/IColorCreation';
import { MockColorsRepository } from '../../../repositories/colors/MockColorsRepository';
import { CreateColorUseCases } from './CreateColorUseCases';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';

describe('Create Color', () => {

  const colorsRepository = new MockColorsRepository();
  const createColorUseCases = new CreateColorUseCases(colorsRepository);

  afterEach(() => {
    colorsRepository.cleanRepository();
  });

  it('should create a new color', async () => {
    const color: IColorCreation = {
      color: 'red',
    };

    const colorCreated = await createColorUseCases.execute(color);

    expect(colorCreated).not.toBeNull();
    expect(colorCreated).toEqual({
      id: expect.any(String),
      color: color.color,
    });
  });

  it('should throw an error when try create two same colors', async () => {
    await createColorUseCases.execute({
      color: 'red',
    });

    const createColor = () => createColorUseCases.execute({ color: 'red' });

    expect(createColor).rejects.toThrow(BadRequestError);
    expect(createColor).rejects.toThrow('Essa cor/descrição já existe');
  });

  it('should throw an error when try create without color attribute', async () => {

    //@ts-ignore
    expect(() => createColorUseCases.execute({})).rejects.toThrow(RequiredFieldsError);
  });

});
