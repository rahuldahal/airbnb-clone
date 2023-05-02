import express, { Request, Response } from 'express';
import userRouter from './routers/user';
import { StatusCodes } from 'http-status-codes';

const app = express(); // initialize the express 'app'

app.use(express.json());

// routers setup
app.use('/user', userRouter);

// 404 route
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND);
  res.json({
    message: 'Route not found!',
  });
});

export default app;
