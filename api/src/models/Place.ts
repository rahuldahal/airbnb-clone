import { IUser } from './User';
import mongoose, { Document, Schema } from 'mongoose';

export interface PlaceDocument extends Document {
  price: number;
  title: string;
  address: string;
  perks: string[];
  checkIn: number;
  photos: string[];
  checkOut: number;
  extraInfo: string;
  maxGuests: number;
  owner: IUser['_id'];
  description: string;
}

const placeSchema: Schema = new mongoose.Schema({
  price: Number,
  title: String,
  address: String,
  perks: [String],
  checkIn: Number,
  photos: [String],
  checkOut: Number,
  extraInfo: String,
  maxGuests: Number,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const PlaceModel = mongoose.model<PlaceDocument>('Place', placeSchema);

export default PlaceModel;
