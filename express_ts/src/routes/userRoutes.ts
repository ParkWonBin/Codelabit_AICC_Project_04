import { Router } from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.delete('/delete/:id', authMiddleware, UserController.delete);
router.put('/update/:id', authMiddleware, UserController.update);

export default router;
