import UserModel from '../models/UserModel';
import { User } from '../types/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

class UserService {
  static async register(userData: User) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return await UserModel.create(userData);
  }

  static async login({ username, password }: { username: string; password: string }) {
    const user = await UserModel.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, jwtConfig.jwtSecret, {
      expiresIn: '1h',
    });
    return token;
  }

  static async delete(userId: number) {
    await UserModel.delete(userId);
  }

  static async update(userId: number, updateData: Partial<User>) {
    return await UserModel.update(userId, updateData);
  }
}

export default UserService;
