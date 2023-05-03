import { Router } from 'express';
import { signUpHandler } from '../controllers/user';

const userRouter = Router();

userRouter.post('/', signUpHandler);

export default userRouter;
