import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  logoutHandler,
  profileHandler,
  signInHandler,
  signUpHandler,
} from '../controllers/user';

const userRouter = Router();

userRouter.post('/', signUpHandler);
userRouter.post('/signIn', signInHandler);
userRouter.get('/', isAuthenticated, profileHandler);
userRouter.get('/logout', isAuthenticated, logoutHandler);

export default userRouter;
