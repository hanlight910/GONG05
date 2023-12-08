import express from 'express';
import ProductController from '../controllers/productController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
const productController = new ProductController();

router.post('/', authenticateToken, productController.create);
router.put('/:productId', authenticateToken, productController.update);
router.delete('/:productId', authenticateToken, productController.delete);
router.get('/', productController.findAll);
router.get('/:productId', productController.findById);

export default router;
