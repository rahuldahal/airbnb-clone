import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { createPlaceHandler, getPlaceHandler } from '../controllers/place';

const placeRouter = Router();

placeRouter.post('/', isAuthenticated, createPlaceHandler);
placeRouter.get('/:id', isAuthenticated, getPlaceHandler);

export default placeRouter;
