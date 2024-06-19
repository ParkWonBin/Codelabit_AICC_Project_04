import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as any).message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const token = await UserService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: (error as any).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await UserService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: (error as any).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await UserService.update(parseInt(req.params.id), req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as any).message });
    }
  }
}

export default UserController;
