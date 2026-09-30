import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect as any);

router.get('/', projectController.getProjects as any);
router.get('/:id', projectController.getProject as any);
router.post('/', projectController.createProject as any);
router.put('/:id', projectController.updateProject as any);
router.delete('/:id', projectController.deleteProject as any);

export default router;
