import express from 'express';
import ProductController from '../controllers/productController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, ProductController.create);
router.put('/:productId', authenticateToken, ProductController.update);
router.delete('/:productId', authenticateToken, ProductController.delete);
router.get('/', ProductController.findAll);
router.get('/:productId', ProductController.findById);

export default router;
