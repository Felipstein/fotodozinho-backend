import { ProductCreateRequest } from '../../../entities/product/dtos/ProductCreateRequest';
import { IProduct } from '../../../entities/product/IProduct';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { MockProductCategoriesRepository } from '../../../repositories/product-categories/MockProductCategoriesRepository';
import { MockProductsRepository } from '../../../repositories/product/MockProductsRepository';
import { CreateProductUseCases } from './CreateProductUseCases';

describe('Create Product', () => {

  const productsRepository = new MockProductsRepository();
  const productCategoriesRepository = new MockProductCategoriesRepository();
  const createProductUseCases = new CreateProductUseCases(productsRepository, productCategoriesRepository);

  afterEach(() => {
    productsRepository.cleanRepository();
    productCategoriesRepository.cleanRepository();
  });

  it('should create a product', async () => {
    const category = await productCategoriesRepository.create({ name: 'all' });

    const product = await createProductUseCases.execute({
      name: 'Product Name',
      description: 'A description',
      price: 50,
      categoryId: category.id,
    });

    const productListed = await productsRepository.listById(product.id);

    expect(productListed).not.toBeUndefined();
    expect(productListed).toEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      rated: expect.any(Number),
      category,
    } as IProduct);
  });

  it('should return rated equals 0 when create a product', async () => {
    const category = await productCategoriesRepository.create({ name: 'all' });

    const product = await createProductUseCases.execute({
      name: 'Product Name',
      description: 'A description',
      price: 50,
      categoryId: category.id,
    });

    expect(product).toHaveProperty('price');
    expect(product.rated).toBe(0);
  });

  it('should throw an error when creating a product with missing properties', async () => {
    const category = await productCategoriesRepository.create({ name: 'all' });

    const product = {
      description: 'A description',
      price: 50,
      categoryId: category.id,
    };

    expect(() => createProductUseCases.execute(product as ProductCreateRequest)).rejects.toThrow(RequiredFieldsError);
  });

});
