import { MockProductCategoriesRepository } from '../../../repositories/product-categories/MockProductCategoriesRepository';
import { ListProductCategoriesUseCases } from './ListProductCategoriesUseCases';

describe('List all Product Categories', () => {

  const productCategoriesRepository = new MockProductCategoriesRepository();
  const listProductCategoriesUseCases = new ListProductCategoriesUseCases(productCategoriesRepository);

  afterEach(() => {
    productCategoriesRepository.cleanRepository();
  });

  it('should list two product categories', async () => {
    await productCategoriesRepository.create({ name: 'all' });
    await productCategoriesRepository.create({ name: 'smalls' });

    const productCategoriesListed = await listProductCategoriesUseCases.execute();

    expect(productCategoriesListed).toHaveLength(2);
  });

});
