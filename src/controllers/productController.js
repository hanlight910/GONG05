import { validationResult } from 'express-validator';
import ProductService from '../services/productService.js';

class ProductController {
  static async create(req, res) {
    try {
      const { title, description } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.locals.user.userId;
      await ProductService.create({
        title,
        description,
        userId,
        status: 'FOR_SALE',
      });

      res.status(201).json({ message: '상품을 생성하는데 성공하였습니다' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 오류' });
    }
  }

  static async update(req, res) {
    try {
      const { title, description, status } = req.body;
      const { productId } = req.params;

      await ProductService.update(Number(productId), { title, description, status });

      res.status(201).json({ message: '상품을 수정하는데 성공하였습니다' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 오류' });
    }
  }

  static async delete(req, res) {
    try {
      const { productId } = req.params;

      await ProductService.delete(Number(productId));

      res.json({ message: '상품이 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 오류' });
    }
  }

  static async findAll(req, res) {
    try {
      const { sort } = req.query;

      const response = await ProductService.findAll(sort);

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 오류' });
    }
  }

  static async findById(req, res) {
    try {
      const { productId } = req.params;

      const responseProduct = await ProductService.findById(Number(productId));

      res.json(responseProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 오류' });
    }
  }
}

export default ProductController;
