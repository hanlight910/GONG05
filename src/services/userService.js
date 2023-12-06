import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository.js';
const secretKey = process.env.JWT_SECRET;

class UserService {
  static async signUp({ email, password, confirmPassword, name }) {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async login({ email, password }) {

    const user = await UserRepository.findByEmail(email)
    const accessToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '12h',
    });

    return { accessToken };
  }

  static async getUser(userId) {

    const user = await UserRepository.findById(userId);

    return { user };
  }
}

export default UserService;
