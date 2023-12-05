import UserService from '../services/userService.js';

class UserController {
  static async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  static async getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    const user = await UserService.getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: '유저가 존재하지 않습니다.' });
    }
  }

  static async createUser(req, res) {
    const { email, name, password } = req.body;

    const newUser = await UserService.createUser({
      email,
      name,
      password,
    });

    res.json(newUser);
  }
}

export default UserController;
