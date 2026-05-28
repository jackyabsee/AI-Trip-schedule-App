import express from 'express';
import { updateMembership } from '../controllers/userController';
import { verifySupabaseToken } from '../middlewares/auth';

const router = express.Router();

router.patch('/membership', verifySupabaseToken, updateMembership);

export default router;
