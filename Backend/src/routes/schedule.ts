import express from 'express';
import { generateSchedule, getSchedule } from '../controllers/scheduleController';
import { verifySupabaseToken } from '../middlewares/auth';

const router = express.Router();

router.post('/generate', verifySupabaseToken, generateSchedule);
router.get('/:id', verifySupabaseToken, getSchedule);

export default router;
