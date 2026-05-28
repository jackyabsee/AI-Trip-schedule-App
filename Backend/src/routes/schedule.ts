import express from 'express';
import { generateSchedule } from '../controllers/scheduleController';
import { verifySupabaseToken } from '../middlewares/auth';

const router = express.Router();

router.post('/generate', verifySupabaseToken, generateSchedule);

export default router;
