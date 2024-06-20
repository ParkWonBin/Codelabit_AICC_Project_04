import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtil';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // 임시 캐스팅
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
