import UserModel from '../models/User';
import { Request, Response } from 'express';
import { createUser } from '../services/user';
import { StatusCodes } from 'http-status-codes';

export async function signUpHandler(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    // check for existing email
    const user = await UserModel.prototype.doesEmailExist(email);
    if (user) {
      return res.status(StatusCodes.CONFLICT).json({
        error: 'The email is already registered', // TODO: add error messages to constant
      });
    }

    // create a new user
    await createUser({ name, email, password });

    return res.status(StatusCodes.CREATED).end();
  } catch (e) {
    console.log(e);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(e);
  }
}
