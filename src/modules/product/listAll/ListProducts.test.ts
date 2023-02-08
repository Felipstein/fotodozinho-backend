import { MockProductsRepository } from '../../../repositories/product/MockProductsRepository';
import { ListProductsUseCases } from './ListProductsUseCases';

describe('List all Products', () => {

  const productsRepository = new MockProductsRepository();
  const listProductsUseCases = new ListProductsUseCases(productsRepository);

  it('should list two products', async () => {
    await productsRepository.create({
      name: 'Product Name',
      description: 'A description',
      price: 100,
      categoryId: 'fake-category-id',
    });

    await productsRepository.create({
      name: 'Other Product',
      description: 'A description',
      price: 50,
      categoryId: 'fake-category-id',
    });

    const productsListed = await listProductsUseCases.execute();

    expect(productsListed).toHaveLength(2);
  });

});
