import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  createBookingHandler,
  getBookingHandler,
} from '../controllers/booking';

const bookingRouter = Router();

bookingRouter.post('/', isAuthenticated, createBookingHandler);
bookingRouter.get('/', isAuthenticated, getBookingHandler);

export default bookingRouter;
