import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);

export default router;
