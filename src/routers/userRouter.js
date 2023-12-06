import express from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다.'),
  ],
  UserController.signUp
);

router.post('/login', UserController.login);

router.get('/info', authenticateToken, UserController.getUser);

export default router;
