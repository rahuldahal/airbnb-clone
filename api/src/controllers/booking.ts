import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createBooking, getBooking } from '../services/booking';

export async function createBookingHandler(req: Request, res: Response) {
  try {
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    const bookingDoc = await createBooking({
      place,
      name,
      phone,
      price,
      checkIn,
      checkOut,
      numberOfGuests,
      user: req['payload']._id,
    });

    res.status(StatusCodes.CREATED).json(bookingDoc);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: e,
    });
  }
}

export async function getBookingHandler(req: Request, res: Response) {
  try {
    const booking = await getBooking(req['payload']._id);
    res.status(StatusCodes.OK).json({ booking });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: e,
    });
  }
}
