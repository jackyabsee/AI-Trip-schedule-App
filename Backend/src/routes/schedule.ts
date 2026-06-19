import express from 'express';
import { generateSchedule, getSchedule, updateSchedule } from '../controllers/scheduleController';
import { verifySupabaseToken } from '../middlewares/auth';

const router = express.Router();

router.post('/generate', verifySupabaseToken, generateSchedule);
router.get('/:id', verifySupabaseToken, getSchedule);
// Add to your existing routes
router.put('/:id', verifySupabaseToken, updateSchedule);

export default router;
