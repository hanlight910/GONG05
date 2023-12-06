import ProductRepository from '../repositories/productRepository.js';

class ProductService {
  static async create({ title, description, userId, status }) {
    const product = await ProductRepository.create({
      title,
      description,
      userId,
      status,
    });

    return product;
  }

  static async update(productId, { title, description, status }) {
    const existingProduct = await ProductRepository.findById(productId);

    if (!existingProduct) {
      throw new Error('해당 제품이 존재하지 않습니다.');
    }

    const updatedProduct = await ProductRepository.update(productId, {
      title,
      description,
      status,
    });

    return updatedProduct;
  }

  static async delete(productId) {
    const existingProduct = await ProductRepository.findById(productId);

    if (!existingProduct) {
      throw new Error('해당 제품이 존재하지 않습니다.');
    }

    await ProductRepository.delete(productId);
  }

  static async findAll(sort) {
    const products = await ProductRepository.findAll(sort);
    return { products };
  }

  static async findById(productId) {
    const productInfo = await ProductRepository.findById(productId);

    if (!productInfo) {
      throw new Error('상품을 찾을 수 없습니다.');
    }

    return {
      id: productInfo.id,
      title: productInfo.title,
      description: productInfo.description,
      name: productInfo.user.name,
      status: productInfo.status,
      createdAt: productInfo.createdAt,
    };
  }
}

export default ProductService;
