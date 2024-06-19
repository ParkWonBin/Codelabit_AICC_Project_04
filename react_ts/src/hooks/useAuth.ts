// src/hooks/useAuth.ts
import axios from 'axios';
import { UserInfo } from '../types';

const EXPRESS_URL = process.env.REACT_APP_EXPRESS_URL || 'http://localhost:4001';

export const login = async (username: string, password: string): Promise<UserInfo> => {
  const response = await axios.post(`${EXPRESS_URL}/api/users/login`, { username, password });
  const userInfo = {
      id:response.data.loginInfo.id,
      username:response.data.loginInfo.username,
      email:response.data.loginInfo.email,
      token:response.data.loginInfo.token,
      isLoggedIn:true
    }
  return userInfo;
};

export const register = async (username: string, email: string, password: string): Promise<void> => {
  await axios.post(`${EXPRESS_URL}/api/users/register`, { username, email, password });
};
