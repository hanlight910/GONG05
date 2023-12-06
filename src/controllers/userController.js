import { check, validationResult } from 'express-validator';
import UserService from '../services/userService.js';

const signUpValidation = [
  check('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다.'),
];

class UserController {
  static async signUp(req, res) {
    try {
      const { email, password, confirmPassword, name } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const responseUser = await UserService.signUp({
        email,
        password,
        confirmPassword,
        name,
      });

      res.status(201).json({ message: '회원가입 성공!', user: responseUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 에러' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const responseToken = await UserService.login({ email, password });

      res.json(responseToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 에러' });
    }
  }

  static async getUser(req, res) {
    try {
      const responseUser = await UserService.getUser(req.locals.user.userId);

      res.json(responseUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 에러' });
    }
  }
}

export default UserController;
