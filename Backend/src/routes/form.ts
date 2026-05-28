import express from 'express';
import { getFormOptions } from '../controllers/formController';

const router = express.Router();

router.get('/options', getFormOptions);

export default router;
