import bcryptjs from 'bcryptjs';
import UserModel from '../models/User';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function signInHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { name, email, password } = req.body;

  try {
    const SALT = bcryptjs.genSaltSync(10);
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcryptjs.hashSync(password, SALT),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(e);
  }
}
