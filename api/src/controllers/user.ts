import UserModel from '../models/User';
import { Request, Response } from 'express';
import { createUser } from '../services/user';
import { StatusCodes } from 'http-status-codes';
import { signAccessToken, Payload } from '../utils/jwt';
import { ONE_DAY } from '../constants/date';

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
    const { _id } = await createUser({ name, email, password });

    // generate accessToken
    const payload: Payload = {
      _id,
      email,
      name,
    };
    const accessToken = signAccessToken(payload);

    return res
      .status(StatusCodes.CREATED)
      .cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + ONE_DAY),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .end();
  } catch (e) {
    console.log(e);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(e);
  }
}
