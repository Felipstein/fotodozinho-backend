import { ProductCategoryNotFoundError } from '../../../errors/ProductCategoryNotFoundError';
import { MockProductCategoriesRepository } from '../../../repositories/product-categories/MockProductCategoriesRepository';
import { DeleteProductCategoryUseCases } from './DeleteProductCategoryUseCases';

describe('Delete Product Category', () => {

  const productCategoriesRepository = new MockProductCategoriesRepository();
  const deleteProductCategoryUseCases = new DeleteProductCategoryUseCases(productCategoriesRepository);

  afterEach(() => {
    productCategoriesRepository.cleanRepository();
  });

  it('should delete product category', async () => {
    const { id } = await productCategoriesRepository.create({ name: 'all' });

    await deleteProductCategoryUseCases.execute(id);

    const produtCategory = await productCategoriesRepository.listById(id);

    expect(produtCategory).toBeUndefined();
  });

  it('should throw an error when try delete product category that does not exists', async () => {

    expect(() => deleteProductCategoryUseCases.execute('fake-product-category-id')).rejects.toThrow(ProductCategoryNotFoundError);
  });

});
