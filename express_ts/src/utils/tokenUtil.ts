import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, jwtConfig.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtConfig.jwtSecret);
};
