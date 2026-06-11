import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import scheduleRouter from './routes/schedule';
import usersRouter from './routes/users';
import formRouter from './routes/form';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
// Support comma-separated origins in CORS_ORIGIN environment variable
const rawOrigins = process.env.CORS_ORIGIN || '*';
const allowedOrigins = rawOrigins.split(',').map((s) => s.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., curl, server-to-server) when origin is undefined
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
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
