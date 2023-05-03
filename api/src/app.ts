import userRouter from './routers/user';
import cookieParser from 'cookie-parser';
import placeRouter from './routers/place';
import { StatusCodes } from 'http-status-codes';
import express, { Request, Response } from 'express';

const app = express(); // initialize the express 'app'

app.use(express.json());
app.use(cookieParser());

// routers setup
app.use('/user', userRouter);
app.use('/place', placeRouter);

// 404 route
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND);
  res.json({
    message: 'Route not found!',
  });
});

export default app;
