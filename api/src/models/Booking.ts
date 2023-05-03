import { Document, Schema, Model, model } from 'mongoose';

export interface BookingDocument extends Document {
  place: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  name: string;
  phone: string;
  price?: number;
}

const bookingSchema: Schema = new Schema({
  place: { type: Schema.Types.ObjectId, required: true, ref: 'Place' },
  user: { type: Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const BookingModel: Model<BookingDocument> = model<BookingDocument>(
  'Booking',
  bookingSchema
);

export default BookingModel;
