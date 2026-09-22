import { Router } from 'express';
import { generateTasks } from '../controllers/aiController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect as any);
router.post('/generate-tasks', generateTasks as any);

export default router;
