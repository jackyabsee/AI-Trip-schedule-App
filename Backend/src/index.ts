import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import scheduleRouter from './routes/schedule';
import usersRouter from './routes/users';
import formRouter from './routes/form';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/api/schedule', scheduleRouter);
app.use('/api/users', usersRouter);
app.use('/api/form', formRouter);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});
