import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { MockProductCategoriesRepository } from '../../../repositories/product-categories/MockProductCategoriesRepository';
import { ListProductCategoryByIdUseCases } from './ListProductCategoryByIdUseCases';

describe('List Product Categories by ID', () => {

  const productCategoriesRepository = new MockProductCategoriesRepository();
  const listProductCategoryByIdUseCases = new ListProductCategoryByIdUseCases(productCategoriesRepository);

  afterEach(() => {
    productCategoriesRepository.cleanRepository();
  });

  it('should list product category', async () => {
    const { id } = await productCategoriesRepository.create({ name: 'all' });

    const productCategoryListed = await listProductCategoryByIdUseCases.execute(id);

    expect(productCategoryListed).toEqual({
      id,
      name: 'all',
    });
  });

  it('should throw an error when list product category that does not exists', async () => {

    expect(() => listProductCategoryByIdUseCases.execute('fake-product-category-id')).rejects.toThrow(ProductCategoryNotFoundError);
  });

});
