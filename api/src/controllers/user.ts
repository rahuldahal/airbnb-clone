import UserModel from '../models/User';
import { Request, Response } from 'express';
import { ONE_DAY } from '../constants/date';
import isEmail from 'validator/lib/isEmail';
import { StatusCodes } from 'http-status-codes';
import { isEmpty, isString } from '../utils/string';
import { createUser, findUser } from '../services/user';
import { signAccessToken, Payload } from '../utils/jwt';
import { SignInErrors, SignUpErrors } from '../constants/validationErrors';

export async function signUpHandler(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    // check for existing email
    const user = await UserModel.prototype.doesEmailExist(email);
    if (user) {
      return res.status(StatusCodes.CONFLICT).json({
        error: SignUpErrors.DUPLICATE_EMAIL,
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

export async function signInHandler(req: Request, res: Response) {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        fields: ['email', 'password'],
        message: SignInErrors.NO_EMAIL_PASSWORD,
      },
    });
  }
  if (!isEmail(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        fields: ['email'],
        message: SignInErrors.NOT_VALID_EMAIL_TYPE,
      },
    });
  }
  if (!isString(password)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        fields: ['password'],
        message: SignInErrors.NOT_VALID_PASSWORD_TYPE,
      },
    });
  }

  // authenticate user
  const user = await UserModel.prototype.doesEmailExist(email);
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        fields: ['email'],
        message: SignInErrors.EMAIL_NOT_REGISTERED,
      },
    });
  }
  const isPasswordValid = await UserModel.prototype.validatePassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        fields: ['password'],
        message: SignInErrors.INCORRECT_PASSWORD,
      },
    });
  }

  const { _id, name } = await findUser({ email });
  const payload: Payload = {
    _id,
    email,
    name,
  };
  const accessToken = signAccessToken(payload);

  return res
    .status(StatusCodes.ACCEPTED)
    .cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + ONE_DAY),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .end();
}
