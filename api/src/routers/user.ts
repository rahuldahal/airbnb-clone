import { Router } from 'express';
import { signInHandler } from '../controllers/user';

const userRouter = Router();

userRouter.post('/', signInHandler);

export default userRouter;
