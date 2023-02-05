import { IProductCategory } from '../../../entities/product-category/IProductCategory';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { MockProductCategoriesRepository } from '../../../repositories/product-categories/MockProductCategoriesRepository';
import { CreateProductCategoryUseCases } from './CreateProductCategoryUseCases';

describe('Create Product Category', () => {

  const productCategoriesRepository = new MockProductCategoriesRepository();
  const createProductCategoryUseCases = new CreateProductCategoryUseCases(productCategoriesRepository);

  afterEach(() => {
    productCategoriesRepository.cleanRepository();
  });

  it('should create product category', async () => {
    const { id } = await createProductCategoryUseCases.execute({ name: 'all' });

    const productCategory = await productCategoriesRepository.listById(id);

    expect(productCategory).not.toBeNull();
    expect(productCategory).not.toBeUndefined();
    expect(productCategory).toEqual({
      id,
      name: 'all',
    } as IProductCategory);
  });

  it('should throw an error when no name is sent', async () => {

    // @ts-ignore
    expect(() => createProductCategoryUseCases.execute({})).rejects.toThrow(RequiredFieldsError);
  });

});
