import express from 'express';
import UserController from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/info', authenticateToken, UserController.getUser);

export default router;
