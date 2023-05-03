import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createPlace, getPlace } from '../services/place';

export async function createPlaceHandler(req: Request, res: Response) {
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  const placeDoc = await createPlace({
    owner: req['payload']._id,
    price,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });

  res.status(StatusCodes.CREATED).json(placeDoc);
}

export async function getPlaceHandler(req: Request, res: Response) {
  const { id } = req.params;
  const place = await getPlace(id);
  res.status(StatusCodes.OK).json({ place });
}
