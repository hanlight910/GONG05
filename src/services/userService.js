import UserRepository from '../repositories/userRepository.js'

class UserService {
    static getAllUsers() {
      return UserRepository.getAllUsers();
    }
  
    static getUserById(userId) {
      return UserRepository.getUserById(userId);
    }
  
    static createUser(userData) {
      return UserRepository.createUser(userData);
    }
  }
  
export default UserService;