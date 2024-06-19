import axios from 'axios';
import { UserInfo } from '../types';

export const login = async (username: string, password: string): Promise<UserInfo> => {
  try {
    const response = await axios.post('/api/login', { username, password });
    return { username: response.data.username, isLoggedIn: true };
  } catch (error) {
    throw new Error('Login failed');
  }
};
