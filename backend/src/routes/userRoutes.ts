import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect as any);
router.get('/', userController.getUsers as any);
router.get('/:id', userController.getUser as any);
router.post('/', userController.createUser as any);
router.put('/:id', userController.updateUser as any);
router.delete('/:id', userController.deleteUser as any);

export default router;
