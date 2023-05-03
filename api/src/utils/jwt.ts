import jwt from 'jsonwebtoken';
import { ONE_DAY } from '../constants/date';
import { ObjectId } from 'mongoose';

export interface Payload {
  _id: ObjectId;
  email: string;
  name: string;
}

export function signAccessToken(payload: Payload): string {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ONE_DAY,
  });
}
