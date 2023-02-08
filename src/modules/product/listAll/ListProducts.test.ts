import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { MockProductCategoriesRepository } from '../../../repositories/product-categories/MockProductCategoriesRepository';
import { MockProductsRepository } from '../../../repositories/product/MockProductsRepository';
import { ListProductsUseCases } from './ListProductsUseCases';

describe('List all Products', () => {

  const productsRepository = new MockProductsRepository();
  const productCategoriesRepository = new MockProductCategoriesRepository();
  const listProductsUseCases = new ListProductsUseCases(productsRepository, productCategoriesRepository);

  afterEach(() => {
    productsRepository.cleanRepository();
    productCategoriesRepository.cleanRepository();
  });

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

  it('should list only products related by category', async () => {
    const { id: categoryId1 } = await productCategoriesRepository.create({ name: 'all' });
    const { id: categoryId2 } = await productCategoriesRepository.create({ name: 'other' });

    await productsRepository.create({
      name: 'Product Name',
      description: 'A description',
      price: 100,
      categoryId: categoryId1,
    });

    await productsRepository.create({
      name: 'Other Product',
      description: 'A description',
      price: 50,
      categoryId: categoryId1,
    });

    await productsRepository.create({
      name: 'Simple Product',
      description: 'A description',
      price: 25,
      categoryId: categoryId2,
    });

    const productsListed1 = await listProductsUseCases.execute(categoryId1);
    const productsListed2 = await listProductsUseCases.execute(categoryId2);

    expect(productsListed1).toHaveLength(2);
    expect(productsListed2).toHaveLength(1);
  });

  it('should throw an error when try list products by category that does not exists', async () => {

    expect(() => listProductsUseCases.execute('fake-category-id')).rejects.toThrow(ProductCategoryNotFoundError);
  });

});
