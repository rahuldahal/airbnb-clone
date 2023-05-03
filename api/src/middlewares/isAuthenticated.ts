import { verifyToken } from '../utils/jwt';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookies } = req;
  if (!cookies || !cookies.accessToken) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED).end();
  }

  try {
    const payload = verifyToken(cookies.accessToken);
    if (!payload) {
      throw new Error();
    }

    req['payload'] = payload;

    return next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json(error.message);
  }
}
