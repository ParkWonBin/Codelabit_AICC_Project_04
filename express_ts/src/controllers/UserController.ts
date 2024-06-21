import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async register(req: Request, res: Response) {
    console.log(`register : ${JSON.stringify(req.body)}`)
    try {
      const user = await UserService.register(req.body);
      console.log(`register - complete : ${JSON.stringify(user)}`)
      res.status(201).json(user);
    } catch (error) {
      console.log(`register - Fail: ${JSON.stringify(error)}`)
      res.status(400).json({ message: (error as any).message });
    }
  }

  static async login(req: Request, res: Response) {
    console.log(`login : ${JSON.stringify(req.body)}`)
    try {
      const loginInfo = await UserService.login(req.body);
      console.log(`loginInfo : ${JSON.stringify(loginInfo)}`)

      res.status(200).json({ loginInfo });
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
