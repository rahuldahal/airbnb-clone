import { Router } from 'express';
import { signInHandler, signUpHandler } from '../controllers/user';

const userRouter = Router();

userRouter.post('/', signUpHandler);
userRouter.post('/signIn', signInHandler);

export default userRouter;
