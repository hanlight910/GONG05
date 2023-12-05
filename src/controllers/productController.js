// src/controllers/ProductController.js
import ProductService from '../services/productService.js';

class ProductController {
  static async getAllProducts(req, res) {
    const products = await ProductService.getAllProducts();
    res.json(products);
  }

  static async getProductById(req, res) {
    const productId = parseInt(req.params.id, 10);
    const product = await ProductService.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  static async createProduct(req, res) {
    const { title, description } = req.body;

    const newProduct = await ProductService.createProduct({
      title,
      description,
      status: "FOR_SALE",
    });

    res.json(newProduct);
  }
}

export default ProductController;
