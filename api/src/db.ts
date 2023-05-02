import mongoose, { Mongoose } from 'mongoose';

export default function db(): Promise<Mongoose> {
  return mongoose.connect(process.env.DB_URI);
}
