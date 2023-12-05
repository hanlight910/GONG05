import ProductRepository from '../repositories/productRepository.js';

class ProductService {
  static getAllProducts() {
    return ProductRepository.getAllProducts();
  }

  static getProductById(productId) {
    return ProductRepository.getProductById(productId);
  }

  static createProduct(productData) {
    return ProductRepository.createProduct(productData);
  }
}

export default ProductService;
