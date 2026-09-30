import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect as any);

router.get('/', taskController.getTasks as any);
router.get('/:id', taskController.getTask as any);
router.post('/', taskController.createTask as any);
router.put('/:id', taskController.updateTask as any);
router.patch('/:id/status', taskController.updateTaskStatus as any);
router.delete('/:id', taskController.deleteTask as any);

export default router;
