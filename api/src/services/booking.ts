import Booking from '../models/Booking';

export async function createBooking(data) {
  try {
    return await Booking.create(data);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

export async function getBooking(user) {
  try {
    return await Booking.find({ user }).populate('place');
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
